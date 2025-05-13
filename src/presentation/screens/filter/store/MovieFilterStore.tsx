import {makeAutoObservable, runInAction} from 'mobx';
import {Movie} from '../../../../domain/movie/entities/Movies';
import {errorHandler} from '../../../base/errorHandler';
import {discoverMoviesByGenresUseCase} from '../../../../domain/movie/usecases/DiscoverMoviesByGenresUseCase';

class MovieFilterStore {
  isLoading: boolean = false;
  pageLoading: boolean = false;
  filteringResult: Movie[] = [];
  error: string = '';
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
    this.loadFilteredMovies(this.page);
  }

  async loadFilteredMovies(page: number) {
    const useCase = discoverMoviesByGenresUseCase.execute(undefined, page);

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
}

export default MovieFilterStore;
