import { favoritesDataSource } from '@data/favorites/FavoritesRepository';
import { Movies } from '@domain/movie/entities/Movies';

export const getFavoriteMoviesUseCase = {
  async execute(
    accountId: string,
    sessionId: string,
    page?: number,
  ): Promise<Movies> {
    return favoritesDataSource.getFavoriteMovies(accountId, sessionId, page);
  },
};
