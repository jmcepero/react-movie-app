import {preferenceRemoteDataSource} from '../../../data/preferences/remote/PreferenceRemoteDataSource';

export const isUserCompleteOnBoardingUseCase = {
  async execute(userId: string): Promise<boolean> {
    return preferenceRemoteDataSource.userCompleteOnBoarding(userId);
  },
};
