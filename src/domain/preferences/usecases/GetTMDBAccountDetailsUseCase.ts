import { preferenceDataSource } from '@data/preferences/PreferenceRepository';

export const getTMDBAccountDetailsUseCase = {
  async execute(sessionId: string): Promise<string> {
    return preferenceDataSource.getTMDBAccountId(sessionId);
  },
};
