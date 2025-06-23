import { favoritesDataSource } from '@data/favorites/FavoritesRepository';
import { TVShow } from '@domain/tv_shows/entities/TVShows';

export const getAllFavoriteTvShowsUseCase = {
  async execute(accountId: string, sessionId: string): Promise<TVShow[]> {
    return favoritesDataSource.getAllFavoriteTvShows(accountId, sessionId);
  },
};
