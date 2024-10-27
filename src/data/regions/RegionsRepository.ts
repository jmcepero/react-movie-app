import {Region} from '../../domain/regions/entities/Regions';
import {regionsRemoteDataSourceImpl} from './remote/RegionsRemoteDataSource';
import {regionsResponseToDomain} from './mapper/RegionsMapper';

export interface RegionsDataSource {
  getWatchRegion(): Promise<Region[]>;
}

export const regionsDataSourceImpl: RegionsDataSource = {
  async getWatchRegion(): Promise<Region[]> {
    const resp = await regionsRemoteDataSourceImpl.getWatchRegions();
    return regionsResponseToDomain(resp).results;
  },
};
