import { favoritesDataSource } from '@data/favorites/FavoritesRepository';
import { Movie } from '@domain/movie/entities/Movies';

export const getAllFavoriteMoviesUseCase = {
  async execute(accountId: string, sessionId: string): Promise<Movie[]> {
    return favoritesDataSource.getAllFavoriteMovies(accountId, sessionId);
  },
};
