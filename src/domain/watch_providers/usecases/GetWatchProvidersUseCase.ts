import { WatchProviderDataSource } from '../../../data/watch_providers/WatchProviderRepository';
import { WatchProvider } from '../entities/WatchProviders';

class GetWatchProviderUseCase {

    constructor(private repository: WatchProviderDataSource) {}

    async execute(itemId: string, itemType: string): Promise<WatchProvider[]> {
        return this.repository.getWatchProvider(itemId, itemType)
    }
}

export default GetWatchProviderUseCase;