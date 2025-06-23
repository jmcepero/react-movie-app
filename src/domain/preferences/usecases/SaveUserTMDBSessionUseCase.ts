import { preferenceRemoteDataSource } from '../../../data/preferences/remote/PreferenceRemoteDataSource';

export const saveUserTMDBSessionUseCase = {
  async execute(userId: string, session: string | null): Promise<void> {
    return preferenceRemoteDataSource.saveUserTMDBSession(userId, session);
  },
};
