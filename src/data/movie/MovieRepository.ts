import {
  movieDetailResponseToDetail,
  moviesResponseToDomain,
} from './mapper/MovieMapper';
import {Movie, Movies} from '../../domain/movie/entities/Movies';
import {movieRemoteDataSource} from './remote/MovieRemoteDataSource';

export interface MovieDataSource {
  getNowPlaying(page?: number): Promise<Movies>;
  getPopular(page?: number): Promise<Movies>;
  getTopRated(page?: number): Promise<Movies>;
  findMovies(term: string, page: number): Promise<Movies>;
  getMovieDetail(movieId: string): Promise<Movie>;
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
};
