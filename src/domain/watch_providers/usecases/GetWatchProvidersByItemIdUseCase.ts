import {watchProviderRepositoryImpl} from '../../../data/watch_providers/WatchProviderRepository';
import {WatchProvider} from '../entities/WatchProviders';

export const getWatchProvidersByItemIdUseCase = {
  async execute(itemId: string, itemType: string): Promise<WatchProvider[]> {
    return watchProviderRepositoryImpl.getWatchProviderByItemId(
      itemId,
      itemType,
    );
  },
};
