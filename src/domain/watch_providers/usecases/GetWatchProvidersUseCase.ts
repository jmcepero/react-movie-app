import {watchProviderRepositoryImpl} from '../../../data/watch_providers/WatchProviderRepository';
import {Provider, WatchProvider} from '../entities/WatchProviders';

export const getWatchProvidersCase = {
  async execute(itemType: string): Promise<Provider[]> {
    return watchProviderRepositoryImpl.getWatchProviders(itemType);
  },
};
