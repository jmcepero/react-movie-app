import {
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from '@react-native-firebase/database';
import {CustomGenre} from '../../genre';
import movieDB from '../../api/movieDB';
import {RequestTokenResponse} from '../entities/RequestTokenResponse';
import {TMDBSessionResponse} from '../entities/TMDBSessionResponse';

export interface PreferenceRemoteDataSource {
  saveFavoriteGenres(
    userId: string,
    movieGenres: CustomGenre[],
    tvShowGenres: CustomGenre[],
  ): Promise<void>;
  userCompleteOnBoarding(userId: string): Promise<boolean>;
  getUserTMDBSession(userId: string): Promise<string | null>;
  saveUserTMDBSession(userId: string, session: string | null): Promise<void>;
  getTMDBRequestToken(): Promise<string>;
  createTMDBSession(approvedToken: string): Promise<string>;
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
  getUserTMDBSession: async function (userId: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const preferenciasRef = ref(
        db,
        `users/${userId}/preferences/tmdbSession`,
      );

      get(preferenciasRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saveUserTMDBSession: async function (
    userId: string,
    session: string | null,
  ): Promise<void> {
    const db = getDatabase();

    if (session == null) {
      await ref(db, `users/${userId}/preferences/tmdbSession`).remove();
    } else {
      await update(ref(db, `users/${userId}/preferences/`), {
        tmdbSession: session,
      });
    }
  },
  getTMDBRequestToken: async function (): Promise<string> {
    let url = `authentication/token/new`;
    const result = await movieDB.get<RequestTokenResponse>(url);
    return result.data.request_token;
  },
  createTMDBSession: async function (approvedToken: string): Promise<string> {
    let url = `authentication/session/new`;
    const params = JSON.stringify({request_token: approvedToken});
    const result = await movieDB.post<TMDBSessionResponse>(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.data.session_id;
  },
};
