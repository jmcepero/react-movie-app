import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Movie} from '../../../../domain/movie/entities/Movies';
import {errorHandler} from '../../../base/errorHandler';
import {discoverMoviesByGenresUseCase} from '../../../../domain/movie/usecases/DiscoverMoviesByGenresUseCase';
import {FilterChipsStore} from './FilterChipsStore';
import {MovieFilterRequest} from '../../../../domain/movie/entities/MovieFilterRequest';
import {MapHelper} from '../utils/Maps';

class MovieFilterStore {
  isLoading: boolean = false;
  pageLoading: boolean = false;
  filteringResult: Movie[] = [];
  error: string = '';
  page: number = 1;
  filterActive: boolean = false;
  private filterStore: FilterChipsStore;

  constructor(filterStore: FilterChipsStore) {
    makeAutoObservable(this);
    this.filterStore = filterStore;
  }

  get filterChipLoading() {
    return this.filterStore.isLoading;
  }

  onScreenLoaded() {
    this.filterStore.onScreenLoaded();
    this.loadFilteredMovies(1);
  }

  async loadFilteredMovies(page: number, params?: Map<string, string>) {
    const useCase = discoverMoviesByGenresUseCase.execute(params, page);

    runInAction(() => {
      this.isLoading = page === 1;
      this.pageLoading = page > 1;
    });

    try {
      const data = await useCase;
      runInAction(() => {
        this.filteringResult =
          page === 1
            ? data.results
            : [...this.filteringResult, ...data.results];
        this.isLoading = false;
        this.pageLoading = false;
        this.error = '';
      });
    } catch (error) {
      const {message} = errorHandler(error);
      runInAction(() => {
        this.isLoading = false;
        this.pageLoading = false;
        this.error = message;
      });
    }
  }

  onReachToEnd() {
    runInAction(() => {
      this.page += 1;
    });
    this.loadFilteredMovies(this.page);
  }

  onFilterPanelDismiss() {
    if (this.filterStore.haveSavedSections) {
      this.filterStore.restoreSelectionState();
    } else {
      this.filterStore.resetSelection();
    }
  }

  onButtonApplyClicked() {
    let filterParams = this.filterStore.selectedChipsMap;
    if (filterParams) {
      this.filterStore.saveSelectionState();
      this.loadFilteredMovies(1, filterParams);
      this.filterActive = true;
    } else {
      this.filterStore.resetAllStates();
      this.filterActive = false;
      this.loadFilteredMovies(1);
    }
  }

  resetAllStates() {
    this.isLoading = false;
    this.pageLoading = false;
    this.filteringResult = [];
    this.error = '';
    this.page = 1;
    this.filterStore.resetAllStates();
  }
}

export default MovieFilterStore;
