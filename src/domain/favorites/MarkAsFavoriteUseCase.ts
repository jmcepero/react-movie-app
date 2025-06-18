import { favoritesDataSource } from '@data/favorites/FavoritesRepository';

export const markAsFavoriteUseCase = {
  async execute(
    accountId: string,
    sessionId: string,
    mediaType: 'movie' | 'tv',
    mediaId: number,
    favorite: boolean,
  ): Promise<void> {
    return favoritesDataSource.markAsFavorite(
      accountId,
      sessionId,
      mediaType,
      mediaId,
      favorite,
    );
  },
};
