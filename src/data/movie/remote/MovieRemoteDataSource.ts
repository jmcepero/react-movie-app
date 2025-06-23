import { VOTE_AVERAGE_GTE } from '../../../presentation/screens/filter/utils/Constant';
import movieDB from '../../api/movieDB';
import {
  MoviesResponse,
  MovieDetailResponse,
} from '../entities/MovieInterface';
import { getValorationById } from '../mapper/MovieMapper';

export interface MovieRemoteDataSource {
  getMoviesByClasification(
    clasification: string,
    page?: number,
  ): Promise<MoviesResponse>;
  findMovies(term: string, page: number): Promise<MoviesResponse>;
  getMovieDetail(movieId: string): Promise<MovieDetailResponse>;
  discoverMovies(
    movieFilterRequest?: Map<string, string>,
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
    movieFilterRequest?: Map<string, string>,
    page?: number,
  ): Promise<MoviesResponse> {
    let url = `discover/movie`;
    const voteAverageGte = movieFilterRequest?.get(VOTE_AVERAGE_GTE);

    let valoration = voteAverageGte
      ? getValorationById(voteAverageGte)
      : undefined;

    const filterParamsObj = movieFilterRequest
      ? Object.fromEntries(movieFilterRequest.entries())
      : {};

    const params: Record<string, any> = {
      page: page || 1,
      ...filterParamsObj,
      ...(valoration && {
        'vote_average.gte': valoration.value[0],
        'vote_average.lte': valoration.value[1],
      }),
    };

    const resp = await movieDB.get<MoviesResponse>(url, { params });
    return resp.data;
  },
};
