import {get, getDatabase, ref, set} from '@react-native-firebase/database';
import {CustomGenre} from '../../genre';

export interface PreferenceRemoteDataSource {
  saveFavoriteGenres(
    userId: string,
    movieGenres: CustomGenre[],
    tvShowGenres: CustomGenre[],
  ): Promise<void>;
  userCompleteOnBoarding(userId: string): Promise<boolean>;
}

export const preferenceRemoteDataSource: PreferenceRemoteDataSource = {
  saveFavoriteGenres: async function (
    userId: string,
    movieGenres: CustomGenre[],
    tvShowGenres: CustomGenre[],
  ): Promise<void> {
    const db = getDatabase();
    const movieGenresObject = movieGenres.reduce(
      (acc, genre) => {
        acc[genre.id] = {name: genre.name, image: genre.image};
        return acc;
      },
      {} as Record<string, {name: string; image: string | undefined}>,
    );

    const tvShowGenresObject = tvShowGenres.reduce(
      (acc, genre) => {
        acc[genre.id] = {name: genre.name, image: genre.image};
        return acc;
      },
      {} as Record<string, {name: string; image: string | undefined}>,
    );

    await set(ref(db, `users/${userId}/preferences/`), {
      onBoardingComplete: true,
      movieGenres: movieGenresObject,
      tvShowGenres: tvShowGenresObject,
    });
  },
  userCompleteOnBoarding: async function (userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const preferenciasRef = ref(
        db,
        `users/${userId}/preferences/onBoardingComplete`,
      );

      get(preferenciasRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve(false);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
