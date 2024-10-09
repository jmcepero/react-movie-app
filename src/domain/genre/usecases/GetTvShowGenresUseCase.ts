import {CustomGenre, genreRemoteDataSource} from '../../../data/genre';

export const getTvShowGenresUseCase = {
  async execute(): Promise<CustomGenre[]> {
    return genreRemoteDataSource.getFirebaseGenreByType('tvshow');
  },
};
