import {watchProviderRepositoryImpl} from '../../../data/watch_providers/WatchProviderRepository';
import {WatchProvider} from '../entities/WatchProviders';

export const getWatchProviderUseCase = {
  async execute(itemId: string, itemType: string): Promise<WatchProvider[]> {
    return watchProviderRepositoryImpl.getWatchProvider(itemId, itemType);
  },
};
