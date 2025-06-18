import { preferenceRemoteDataSource } from '../../../data/preferences/remote/PreferenceRemoteDataSource';

export const saveUserTMDBSessionUseCase = {
  async execute(userId: string, session: string): Promise<void> {
    return preferenceRemoteDataSource.saveUserTMDBSession(userId, session);
  },
};
