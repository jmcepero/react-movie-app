import { Movie, Movies } from '@domain/movie/entities/Movies';
import { TVShow, TVShows } from '@domain/tv_shows/entities/TVShows';
import { favoritesRemoteDataSource } from './remote/FavoritesRemoteDataSource';
import {
  moviesResponseArrayToDomain,
  moviesResponseToDomain,
} from '@data/movie/mapper/MovieMapper';
import {
  tvShowResponseArrayToDomain,
  tvShowsResponseToDomain,
} from '@data/tv_shows/mapper/TVShowMapper';

export interface FavoritesDataSource {
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
  ): Promise<Movies>;
  getFavoriteTvShows(
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<TVShows>;
  getAllFavoriteMovies(accountId: string, sessionId: string): Promise<Movie[]>;
  getAllFavoriteTvShows(
    accountId: string,
    sessionId: string,
  ): Promise<TVShow[]>;
}

export const favoritesDataSource: FavoritesDataSource = {
  markAsFavorite: function (
    accountId: string,
    sessionId: string,
    mediaType: 'movie' | 'tv',
    mediaId: number,
    favorite: boolean,
  ): Promise<void> {
    return favoritesRemoteDataSource.markAsFavorite(
      accountId,
      sessionId,
      mediaType,
      mediaId,
      favorite,
    );
  },
  getFavoriteMovies: async function (
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<Movies> {
    const resp = await favoritesRemoteDataSource.getFavoriteMovies(
      accountId,
      sessionId,
      page,
    );
    return moviesResponseToDomain(resp);
  },
  getFavoriteTvShows: async function (
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<TVShows> {
    const resp = await favoritesRemoteDataSource.getFavoriteTvShows(
      accountId,
      sessionId,
      page,
    );

    return tvShowsResponseToDomain(resp);
  },
  getAllFavoriteMovies: async function (
    accountId: string,
    sessionId: string,
  ): Promise<Movie[]> {
    const movieResponses = await favoritesRemoteDataSource.getAllFavoriteMovies(
      accountId,
      sessionId,
    );

    return moviesResponseArrayToDomain(movieResponses);
  },
  getAllFavoriteTvShows: async function (
    accountId: string,
    sessionId: string,
  ): Promise<TVShow[]> {
    const tvShowResponses =
      await favoritesRemoteDataSource.getAllFavoriteTvShows(
        accountId,
        sessionId,
      );

    return tvShowResponseArrayToDomain(tvShowResponses);
  },
};
