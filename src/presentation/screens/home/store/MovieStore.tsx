import {makeAutoObservable, runInAction} from 'mobx';
import {CustomGenre} from '../../../../data/genre/local/CustomGenres';
import {Movie, Movies} from '../../../../domain/movie/entities/Movies';
import {errorHandler} from '../../../base/errorHandler';
import {getNowPlayingUseCase} from '../../../../domain/movie/usecases/GetNowPlayingUseCase';
import {getTopRatedUseCase} from '../../../../domain/movie/usecases/GeTopRatedUseCase';
import {getPopularUseCase} from '../../../../domain/movie/usecases/GetPopularUseCase';
import {userMoviesByGenresUseCase} from '../../../../domain/movie/usecases/UserMoviesByGenresUseCase';
import {getMovieGenresUseCase} from '../../../../domain/genre/usecases/GetMovieGenresUseCase';

class MovieStore {
  isLoading: boolean = true;
  nowPlaying: Movie[] = [];
  popular: Movie[] = [];
  genres: CustomGenre[] = [];
  topRated: Movie[] = [];
  byInterest: Movie[] = [];
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async getMoviesNowPlaying(userId?: string) {
    this.isLoading = true;

    const nowPlayingProm = getNowPlayingUseCase.execute();
    const popularProm = getPopularUseCase.execute();
    const topRatedProm = getTopRatedUseCase.execute();
    const byInterestProm = userId && userMoviesByGenresUseCase.execute(userId);
    const genresProm = getMovieGenresUseCase.execute();

    try {
      const [nowPlayingRes, popularRes, topRatedRes, byInterestRes, genresRes] =
        await Promise.all([
          nowPlayingProm,
          popularProm,
          topRatedProm,
          byInterestProm,
          genresProm,
        ]);

      runInAction(() => {
        this.nowPlaying = nowPlayingRes.results.slice(0, 8);
        this.popular = popularRes.results;
        this.genres = genresRes.slice(0, 8);
        this.topRated = topRatedRes.results;
        if (byInterestRes !== undefined) {
          this.byInterest = (byInterestRes as Movies).results;
        }
        this.isLoading = false;
        this.error = '';
      });
    } catch (error) {
      const {message} = errorHandler(error);
      runInAction(() => {
        this.isLoading = false;
        this.error = message;
      });
    }
  }

  reloadData(userId?: string) {
    this.getMoviesNowPlaying(userId);
  }
}

export default MovieStore;
