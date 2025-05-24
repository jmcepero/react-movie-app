import {
  movieDetailResponseToDetail,
  moviesResponseToDomain,
} from './mapper/MovieMapper';
import {Movie, Movies} from '../../domain/movie/entities/Movies';
import {movieRemoteDataSource} from './remote/MovieRemoteDataSource';
import {get, getDatabase, ref, set} from '@react-native-firebase/database';
import {MovieFilterRequest} from '../../domain/movie/entities/MovieFilterRequest';
import {isolateGlobalState} from 'mobx/dist/internal';
import {WITH_GENRES} from '../../presentation/screens/filter/utils/Constant';

export interface MovieDataSource {
  getNowPlaying(page?: number): Promise<Movies>;
  getPopular(page?: number): Promise<Movies>;
  getTopRated(page?: number): Promise<Movies>;
  findMovies(term: string, page: number): Promise<Movies>;
  getMovieDetail(movieId: string): Promise<Movie>;
  userMoviesByGenres(userId: string, page?: number): Promise<Movies>;
  discoverMovies(
    movieFilterRequest?: Map<string, string>,
    page?: number,
  ): Promise<Movies>;
}

export const movieRepository: MovieDataSource = {
  async getNowPlaying(page?: number): Promise<Movies> {
    const resp = await movieRemoteDataSource.getMoviesByClasification(
      'now_playing',
      page,
    );
    return moviesResponseToDomain(resp);
  },
  async getPopular(page?: number): Promise<Movies> {
    const resp = await movieRemoteDataSource.getMoviesByClasification(
      'popular',
      page,
    );
    return moviesResponseToDomain(resp);
  },
  async getTopRated(page?: number): Promise<Movies> {
    const resp = await movieRemoteDataSource.getMoviesByClasification(
      'top_rated',
      page,
    );
    return moviesResponseToDomain(resp);
  },
  async findMovies(term: string, page: number): Promise<Movies> {
    const resp = await movieRemoteDataSource.findMovies(term, page);
    return moviesResponseToDomain(resp);
  },
  async getMovieDetail(movieId: string): Promise<Movie> {
    const resp = await movieRemoteDataSource.getMovieDetail(movieId);
    return movieDetailResponseToDetail(resp);
  },
  async userMoviesByGenres(userId: string, page?: number): Promise<Movies> {
    const snapshot = await getDatabase()
      .ref(`/users/${userId}/preferences/movieGenres`)
      .once('value');
    const genres = snapshot.val();
    let genresParams = '';
    if (genres) {
      genresParams = Object.keys(genres).join('|');
    }
    const resp = await movieRemoteDataSource.discoverMovies(
      new Map([[WITH_GENRES, genresParams]]),
      page,
    );
    return moviesResponseToDomain(resp);
  },
  async discoverMovies(
    movieFilterRequest?: Map<string, string>,
    page?: number,
  ): Promise<Movies> {
    const resp = await movieRemoteDataSource.discoverMovies(
      movieFilterRequest,
      page,
    );
    return moviesResponseToDomain(resp);
  },
};
