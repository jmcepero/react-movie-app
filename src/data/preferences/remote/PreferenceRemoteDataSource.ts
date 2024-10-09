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

    // Convertir el arreglo de géneros a un objeto
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

    // Guardar el objeto de géneros en la base de datos
    try {
      await set(ref(db, `users/${userId}/preferences/`), {
        onBoardingComplete: true,
        movieGenres: movieGenresObject,
        tvShowGenres: tvShowGenresObject,
      });
      console.log(
        'Preferencias de géneros de películas actualizadas con éxito.',
      );
    } catch (error) {
      console.error(
        'Error al actualizar preferencias de géneros de películas:',
        error,
      );
    }
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
            // Si no existe el valor, asumimos que el onboarding no está completado
            resolve(false);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
