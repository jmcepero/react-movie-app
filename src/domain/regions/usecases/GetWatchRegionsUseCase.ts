import {regionsDataSourceImpl} from '../../../data/regions/RegionsRepository';
import {Region} from '../entities/Regions';

export const getWatchRegionsUseCase = {
  async execute(): Promise<Region[]> {
    return regionsDataSourceImpl.getWatchRegion();
  },
};
