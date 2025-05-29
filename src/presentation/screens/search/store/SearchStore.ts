// searchStore.ts
import {action, makeAutoObservable, reaction, runInAction} from 'mobx';
import {findMoviesUseCase} from '../../../../domain/movie/usecases/FindMoviesUseCase';
import {findPeoplesUseCase} from '../../../../domain/people/usecases/FindPeoplesUseCase';
import {findTVShowUseCase} from '../../../../domain/tv_shows/usecases/FindTVShowUseCase';
import {errorHandler} from '../../../base/errorHandler';

class SearchStore {
  term: string = '';
  selectedChip: number = 0;
  isLoading: boolean = false;
  pageLoading: boolean = false;
  result: any[] = [];
  page: number = 1;
  error: string = '';
  totalPage: number | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {
      searchByTerm: action,
      resetState: action,
      onReachToBottom: action,
    });
    // Reacción para manejar cambios en term o selectedChip
    reaction(
      () => [this.term, this.selectedChip],
      () => {
        if (this.term.length >= 3) {
          this.resetState();
          this.searchByTerm();
        }
      },
    );
  }

  setSearchState(update: Partial<SearchStore>) {
    Object.assign(this, update);
  }

  resetState() {
    this.setSearchState({
      page: 1,
      error: '',
      isLoading: false,
      pageLoading: false,
      result: [],
      totalPage: undefined,
    });
  }

  handleTermChange(value: string) {
    this.term = value;
  }

  setSelectedChip(chip: number) {
    this.selectedChip = chip;
  }

  onReachToBottom() {
    this.searchByTerm();
  }

  async searchByTerm() {
    if (this.totalPage !== undefined && this.page >= this.totalPage) {
      return;
    }
    runInAction(() => {
      this.isLoading = this.page === 1;
      this.pageLoading = this.page > 1;
    });
    try {
      const data = await this.getSearchFunction()(this.term, this.page);
      runInAction(() => {
        this.result =
          this.page === 1 ? data.results : [...this.result, ...data.results];
        this.page++;
        this.error = '';
        this.totalPage = data.totalPages;
      });
    } catch (error) {
      const {message} = errorHandler(error);
      this.error = message;
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.pageLoading = false;
      });
    }
  }

  getSearchFunction() {
    switch (this.selectedChip) {
      case 0:
        return findMoviesUseCase.execute;
      case 1:
        return findTVShowUseCase.execute;
      case 2:
        return findPeoplesUseCase.execute;
      default:
        throw new Error('Invalid chip selected');
    }
  }

  get hasError() {
    return this.error !== '';
  }
}

export default SearchStore;
