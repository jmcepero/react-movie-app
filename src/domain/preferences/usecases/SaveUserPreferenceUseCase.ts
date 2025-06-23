import {CustomGenre} from '../../../data/genre';
import {preferenceRemoteDataSource} from '../../../data/preferences/remote/PreferenceRemoteDataSource';

export const saveUserPreferenceUseCase = {
  async execute(
    userId: string,
    movieGenres: CustomGenre[],
    tvShowGenres: CustomGenre[],
  ): Promise<void> {
    return preferenceRemoteDataSource.saveFavoriteGenres(
      userId,
      movieGenres,
      tvShowGenres,
    );
  },
};
