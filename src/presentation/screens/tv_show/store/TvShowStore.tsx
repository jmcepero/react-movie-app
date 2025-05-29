import {CustomGenre} from '../../../../data/genre';
import {getTvShowGenresUseCase} from '../../../../domain/genre/usecases/GetTvShowGenresUseCase';
import {TVShow} from '../../../../domain/tv_shows/entities/TVShows';
import {getOnTheAirUseCase} from '../../../../domain/tv_shows/usecases/GetOnTheAirUseCase';
import {getTVShowsPouplarUseCase} from '../../../../domain/tv_shows/usecases/GetTVShowsPouplarUseCase';
import {getTVShowsTopRatedUseCase} from '../../../../domain/tv_shows/usecases/GetTVShowsTopRatedUseCase';
import {errorHandler} from '../../../base/errorHandler';
import {makeAutoObservable, runInAction} from 'mobx';

export class TVShowStore {
  isLoading: boolean = false;
  onTheAir: TVShow[] = [];
  popular: TVShow[] = [];
  topRated: TVShow[] = [];
  genres: CustomGenre[] = [];
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded() {
    this.loadTvShows();
  }

  private async getAllTvShows() {
    return Promise.all([
      getOnTheAirUseCase.execute(),
      getTVShowsPouplarUseCase.execute(),
      getTVShowsTopRatedUseCase.execute(),
      getTvShowGenresUseCase.execute(),
    ]);
  }

  async loadTvShows() {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const result = await this.getAllTvShows();
      runInAction(() => {
        this.onTheAir = result[0].results;
        this.popular = result[1].results;
        this.topRated = result[2].results.slice(0, 8);
        this.genres = result[3];
        this.isLoading = false;
      });
    } catch (error) {
      const {message} = errorHandler(error);

      runInAction(() => {
        this.error = message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  get hasError() {
    return this.error !== '';
  }

  get hasData() {
    return (
      this.onTheAir.length > 0 ||
      this.popular.length > 0 ||
      this.topRated.length > 0
    );
  }
}
