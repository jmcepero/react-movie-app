import {watchProviderRemoteDataSourceImpl} from './remote/WatchProviderRemoteDataSource';
import {
  watchProviderByItemIdToDomain,
  watchProvidersToDomain,
} from './mapper/WatchProviderMapper';
import {
  Provider,
  WatchProvider,
} from '../../domain/watch_providers/entities/WatchProviders';

export interface WatchProviderDataSource {
  getWatchProviderByItemId(
    itemId: string,
    itemType: string,
  ): Promise<WatchProvider[]>;
  getWatchProviders(itemType: string): Promise<Provider[]>;
}

export const watchProviderRepositoryImpl: WatchProviderDataSource = {
  getWatchProviderByItemId: async function (
    itemId: string,
    itemType: string,
  ): Promise<WatchProvider[]> {
    const resp =
      await watchProviderRemoteDataSourceImpl.getWatchProviderByItemId(
        itemId,
        itemType,
      );
    return watchProviderByItemIdToDomain(resp);
  },
  getWatchProviders: async function (itemType: string): Promise<Provider[]> {
    const resp =
      await watchProviderRemoteDataSourceImpl.getWatchProviders(itemType);
    return watchProvidersToDomain(resp);
  },
};
