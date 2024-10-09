import {makeAutoObservable, runInAction} from 'mobx';
import {errorHandler} from '../../../base/errorHandler';
import {getTopRatedUseCase} from '../../../../domain/movie/usecases/GeTopRatedUseCase';
import {getPopularUseCase} from '../../../../domain/movie/usecases/GetPopularUseCase';
import {Item} from '../../../../domain/base/Item';
import {MovieListingParams} from '../../../navigation/StackNavigation';
import {Movies} from '../../../../domain/movie/entities/Movies';
import {discoverMoviesByGenresUseCase} from '../../../../domain/movie/usecases/DiscoverMoviesByGenresUseCase';

class MovieListingStore {
  isLoading: boolean = false;
  pageLoading: boolean = false;
  result: Item[] = [];
  page: number = 1;
  error: string = '';
  params: MovieListingParams | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded(params: MovieListingParams) {
    this.params = params;
    this.loadMovies(this.page);
  }

  getUseCaseByParams(page: number): Promise<Movies> {
    const type = this.params!!.params.type;
    const value = this.params!!.params.value;
    if (type === 'byCategory') {
      return value == 'popular'
        ? getPopularUseCase.execute(page)
        : getTopRatedUseCase.execute(page);
    } else {
      return discoverMoviesByGenresUseCase.execute([value], page);
    }
  }

  async loadMovies(page: number) {
    const useCase = this.getUseCaseByParams(page);

    runInAction(() => {
      this.isLoading = page === 1;
      this.pageLoading = page > 1;
    });

    try {
      const data = await useCase;
      runInAction(() => {
        this.result =
          page === 1 ? data.results : [...this.result, ...data.results];
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
    this.loadMovies(this.page);
  }
}

export default MovieListingStore;
