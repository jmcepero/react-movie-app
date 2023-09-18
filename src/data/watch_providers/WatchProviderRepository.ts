import {watchProviderRemoteDataSourceImpl} from './remote/WatchProviderRemoteDataSource';
import {watchProviderResponseToDomain} from './mapper/WatchProviderMapper';
import {WatchProvider} from '../../domain/watch_providers/entities/WatchProviders';

export interface WatchProviderDataSource {
  getWatchProvider(itemId: string, itemType: string): Promise<WatchProvider[]>;
}

export const watchProviderRepositoryImpl: WatchProviderDataSource = {
  async getWatchProvider(
    itemId: string,
    itemType: string,
  ): Promise<WatchProvider[]> {
    const resp =
      await watchProviderRemoteDataSourceImpl.getWatchProviderByMovieId(
        itemId,
        itemType,
      );
    return watchProviderResponseToDomain(resp);
  },
};
