import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Movie} from '../../../../domain/movie/entities/Movies';
import {errorHandler} from '../../../base/errorHandler';
import {discoverMoviesByGenresUseCase} from '../../../../domain/movie/usecases/DiscoverMoviesByGenresUseCase';
import {AccordionStore} from './AccordionStore';
import {MovieFilterRequest} from '../../../../domain/movie/entities/MovieFilterRequest';

class MovieFilterStore {
  isLoading: boolean = false;
  pageLoading: boolean = false;
  filteringResult: Movie[] = [];
  error: string = '';
  page: number = 1;
  private filterStore: AccordionStore;

  constructor(filterStore: AccordionStore) {
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

  async loadFilteredMovies(page: number) {
    const params = this.loadParams();
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

  private loadParams(): MovieFilterRequest {
    const filtersSelected = this.filterStore.selectedChipsMap;
    console.log(filtersSelected);
    return {
      withGenres: filtersSelected.get('with_genres')?.join(','),
      watchRegion: '',
      watchProviders: '',
      year: '',
      voteAverageGte: '',
    };
  }

  onButtonApplyClicked() {
    const params = this.loadParams();
    this.loadFilteredMovies(1);
  }
}

export default MovieFilterStore;
