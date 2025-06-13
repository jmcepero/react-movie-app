import {preferenceDataSource} from '../../../data/preferences/PreferenceRepository';

export const getTMDBRequestTokenUseCase = {
  async execute(): Promise<string> {
    return preferenceDataSource.getTMDBRequestToken();
  },
};
