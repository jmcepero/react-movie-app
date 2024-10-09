import {CustomGenre, genreRemoteDataSource} from '../../../data/genre';

export const getMovieGenresUseCase = {
  async execute(): Promise<CustomGenre[]> {
    return genreRemoteDataSource.getFirebaseGenreByType('movie');
  },
};
