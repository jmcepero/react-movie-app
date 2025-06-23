import { preferenceRemoteDataSource } from '@data/preferences/remote/PreferenceRemoteDataSource';

export const getUserTMDBSessionUseCase = {
  async execute(userId: string): Promise<string | null> {
    return preferenceRemoteDataSource.getUserTMDBSession(userId);
  },
};
