import {
  MovieResponse,
  MoviesResponse,
} from '@data/movie/entities/MovieInterface';
import {
  TVShowResponse,
  TVShowsResponse,
} from '@data/tv_shows/entities/TVShowsInterface';
import {
  MarkFavoritePayload,
  MarkFavoriteResponse,
} from '../entities/FavoritesResponse';
import movieDB from '@data/api/movieDB';

export interface FavoritesRemoteDataSource {
  markAsFavorite(
    accountId: string,
    sessionId: string,
    mediaType: 'movie' | 'tv',
    mediaId: number,
    favorite: boolean,
  ): Promise<void>;

  getFavoriteMovies(
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<MoviesResponse>;
  getFavoriteTvShows(
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<TVShowsResponse>;
  getAllFavoriteMovies(
    accountId: string,
    sessionId: string,
  ): Promise<MovieResponse[]>;
  getAllFavoriteTvShows(
    accountId: string,
    sessionId: string,
  ): Promise<TVShowResponse[]>;
}

export const favoritesRemoteDataSource: FavoritesRemoteDataSource = {
  markAsFavorite: async function (
    accountId: string,
    sessionId: string,
    mediaType: 'movie' | 'tv',
    mediaId: number,
    favorite: boolean,
  ): Promise<void> {
    const url = `account/${accountId}/favorite`;
    const payload: MarkFavoritePayload = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: favorite,
    };

    await movieDB.post<MarkFavoriteResponse>(url, payload, {
      params: {
        session_id: sessionId,
      },
    });
  },
  getFavoriteMovies: async function (
    accountId: string,
    sessionId: string,
    page: number = 1,
  ): Promise<MoviesResponse> {
    const url = `account/${accountId}/favorite/movies`;
    const params = {
      session_id: sessionId,
      sort_by: 'created_at.desc',
      page: page,
    };
    const resp = await movieDB.get<MoviesResponse>(url, { params });
    return resp.data;
  },
  getFavoriteTvShows: async function (
    accountId: string,
    sessionId: string,
    page: number = 1,
  ): Promise<TVShowsResponse> {
    const url = `account/${accountId}/favorite/tv`;
    const params = {
      session_id: sessionId,
      sort_by: 'created_at.desc',
      page: page,
    };
    const resp = await movieDB.get<TVShowsResponse>(url, { params });
    return resp.data;
  },
  getAllFavoriteMovies: async function (
    accountId: string,
    sessionId: string,
  ): Promise<MovieResponse[]> {
    let allMovies: MovieResponse[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const url = `account/${accountId}/favorite/movies`;
      const params = {
        session_id: sessionId,
        sort_by: 'created_at.desc',
        page: currentPage,
      };
      const response = await movieDB.get<MoviesResponse>(url, { params });

      if (response.data && response.data.results) {
        allMovies = allMovies.concat(response.data.results);
        totalPages = response.data.total_pages;
      } else {
        break;
      }
      currentPage++;
    } while (currentPage <= totalPages);

    return allMovies;
  },
  getAllFavoriteTvShows: async function (
    accountId: string,
    sessionId: string,
  ): Promise<TVShowResponse[]> {
    let allTvShows: TVShowResponse[] = [];
    let currentPage = 1;
    let totalPages = 1; // Se actualizará después de la primera llamada

    do {
      const url = `account/${accountId}/favorite/tv`;
      const params = {
        session_id: sessionId,
        sort_by: 'created_at.desc',
        page: currentPage,
      };
      const response = await movieDB.get<TVShowsResponse>(url, { params });

      if (response.data && response.data.results) {
        allTvShows = allTvShows.concat(response.data.results);
        totalPages = response.data.total_pages;
      } else {
        break;
      }
      currentPage++;
    } while (currentPage <= totalPages);

    return allTvShows;
  },
};
