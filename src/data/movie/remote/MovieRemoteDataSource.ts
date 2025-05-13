import {MovieFilterRequest} from '../../../domain/movie/entities/MovieFilterRequest';
import movieDB from '../../api/movieDB';
import {MoviesResponse, MovieDetailResponse} from '../entities/MovieInterface';

export interface MovieRemoteDataSource {
  getMoviesByClasification(
    clasification: string,
    page?: number,
  ): Promise<MoviesResponse>;
  findMovies(term: string, page: number): Promise<MoviesResponse>;
  getMovieDetail(movieId: string): Promise<MovieDetailResponse>;
  discoverMovies(
    movieFilterRequest?: MovieFilterRequest,
    page?: number,
  ): Promise<MoviesResponse>;
}

export const movieRemoteDataSource: MovieRemoteDataSource = {
  async getMoviesByClasification(
    clasification: string,
    page?: number,
  ): Promise<MoviesResponse> {
    let url = `movie/${clasification}`;
    if (page) {
      url = url + `?page=${page}`;
      console.log(url);
    }
    const resp = await movieDB.get<MoviesResponse>(url);

    return resp.data;
  },
  async findMovies(term: string, page: number): Promise<MoviesResponse> {
    let url = `search/movie?query=${term}&page=${page}`;
    const resp = await movieDB.get<MoviesResponse>(url);
    return resp.data;
  },
  async getMovieDetail(movieId: string): Promise<MovieDetailResponse> {
    const resp = await movieDB.get<MovieDetailResponse>(
      `movie/${movieId}?append_to_response=videos,reviews,credits`,
    );
    return resp.data;
  },
  async discoverMovies(
    movieFilterRequest?: MovieFilterRequest,
    page?: number,
  ): Promise<MoviesResponse> {
    let url = `discover/movie`;
    const params = {
      // Parámetros básicos
      page: page || 1, // Valor por defecto para paginación

      // Mapeo de parámetros del filtro usando operador spread y optional chaining
      ...(movieFilterRequest && {
        with_genres: movieFilterRequest.withGenres,
        watch_region: movieFilterRequest.watchRegion,
        'vote_average.gte': movieFilterRequest.voteAverageGte,
        year: movieFilterRequest.year,
      }),
    };

    const resp = await movieDB.get<MoviesResponse>(url, {params});
    return resp.data;
  },
};
