import {CustomGenre} from '../genre/local/CustomGenres';
import {preferenceRemoteDataSource} from './remote/PreferenceRemoteDataSource';

export interface PreferenceDataSource {
  saveFavoriteGenres(
    userId: string,
    movieGenres: CustomGenre[],
    tvShowGenres: CustomGenre[],
  ): Promise<void>;
  userCompleteOnBoarding(userId: string): Promise<boolean>;
  getUserTMDBSession(userId: string): Promise<string | null>;
  saveUserTMDBSession(userId: string, session: string | null): Promise<void>;
  getTMDBRequestToken(): Promise<string>;
  createTMDBSession(approbedToken: string): Promise<string>;
}

export const preferenceDataSource: PreferenceDataSource = {
  saveFavoriteGenres: async function (
    userId: string,
    movieGenres: CustomGenre[],
    tvShowGenres: CustomGenre[],
  ): Promise<void> {
    return await preferenceRemoteDataSource.saveFavoriteGenres(
      userId,
      movieGenres,
      tvShowGenres,
    );
  },
  userCompleteOnBoarding: async function (userId: string): Promise<boolean> {
    return await preferenceRemoteDataSource.userCompleteOnBoarding(userId);
  },
  getUserTMDBSession: async function (userId: string): Promise<string | null> {
    return await preferenceRemoteDataSource.getUserTMDBSession(userId);
  },
  saveUserTMDBSession: async function (
    userId: string,
    session: string | null,
  ): Promise<void> {
    return await preferenceRemoteDataSource.saveUserTMDBSession(
      userId,
      session,
    );
  },
  getTMDBRequestToken: async function (): Promise<string> {
    return await preferenceRemoteDataSource.getTMDBRequestToken();
  },
  createTMDBSession: async function (approbedToken: string): Promise<string> {
    return await preferenceRemoteDataSource.createTMDBSession(approbedToken);
  },
};
