import movieDB from '../../api/movieDB';
import {RegionsResponse} from '../entities/RegionsInterface';

export interface RegionsRemoteDataSource {
  getWatchRegions(): Promise<RegionsResponse>;
}

export const regionsRemoteDataSourceImpl: RegionsRemoteDataSource = {
  getWatchRegions: async function (): Promise<RegionsResponse> {
    const resp = await movieDB.get<RegionsResponse>('watch/providers/regions');
    return resp.data;
  },
};
