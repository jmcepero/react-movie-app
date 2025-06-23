import { favoritesDataSource } from '@data/favorites/FavoritesRepository';
import { Movies } from '@domain/movie/entities/Movies';
import { TVShows } from '@domain/tv_shows/entities/TVShows';

export const getFavoriteTvShowsUseCase = {
  async execute(
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<TVShows> {
    return favoritesDataSource.getFavoriteTvShows(accountId, sessionId, page);
  },
};
