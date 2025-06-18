import {preferenceDataSource} from '../../../data/preferences/PreferenceRepository';

export const createTMDBSessionUseCase = {
  async execute(approbedToken: string): Promise<string> {
    return preferenceDataSource.createTMDBSession(approbedToken);
  },
};
