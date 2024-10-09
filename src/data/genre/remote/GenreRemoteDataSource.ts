import {CustomGenre, GenresResponse} from '..';
import movieDB from '../../api/movieDB';
import database, {
  child,
  DataSnapshot,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';

export interface GenreRemoteDataSource {
  getMovieGenre(): Promise<CustomGenre[]>;
  getTvShowGenre(): Promise<CustomGenre[]>;
  getFirebaseGenreByType(type: 'movie' | 'tvshow'): Promise<CustomGenre[]>;
}

export const genreRemoteDataSource: GenreRemoteDataSource = {
  getMovieGenre: async function (): Promise<CustomGenre[]> {
    const resp = await movieDB.get<GenresResponse>(`genre/movie/list`);
    return resp.data.genres;
  },
  getTvShowGenre: async function (): Promise<CustomGenre[]> {
    const resp = await movieDB.get<GenresResponse>(`genre/tv/list`);
    return resp.data.genres;
  },
  getFirebaseGenreByType: async function (
    type: 'movie' | 'tvshow',
  ): Promise<CustomGenre[]> {
    try {
      const snapshot = await database()
        .ref('/rnmovie/' + type + '/genres')
        .once('value');
      if (snapshot.exists()) {
        const genresArray: CustomGenre[] = [];
        snapshot.forEach(child => {
          const genre: CustomGenre = child.val();
          if (genre) genresArray.push(genre);
          return undefined;
        });
        return genresArray;
      } else {
        console.log('No movie genres data available.');
        return [];
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch movie genres.');
    }
  },
};
