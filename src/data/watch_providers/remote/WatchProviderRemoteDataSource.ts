import movieDB from '../../api/movieDB';
import {
  WatchProviderByMovieResponse,
  WatchProvidersResponse,
} from '../entities/WatchProviderInterface';

export interface WatchProviderRemoteDataSource {
  getWatchProviderByItemId(
    itemId: string,
    itemType: string,
  ): Promise<WatchProviderByMovieResponse>;
  getWatchProviders(itemType: string): Promise<WatchProvidersResponse>;
}

export const watchProviderRemoteDataSourceImpl: WatchProviderRemoteDataSource =
  {
    getWatchProviderByItemId: async function (
      itemId: string,
      itemType: string,
    ): Promise<WatchProviderByMovieResponse> {
      let url = `${itemType === 'movie' ? 'movie' : 'tv'}/${itemId}/watch/providers`;
      const resp = await movieDB.get<WatchProviderByMovieResponse>(url);

      return resp.data;
    },
    getWatchProviders: async function (
      itemType: string,
    ): Promise<WatchProvidersResponse> {
      let url = `watch/providers/${itemType}`;
      const resp = await movieDB.get<WatchProvidersResponse>(url);

      return resp.data;
    },
  };
