import { WatchProviderRemoteDataSource } from './remote/WatchProviderRemoteDataSource';
import { watchProviderResponseToDomain } from './mapper/WatchProviderMapper';
import { WatchProvider } from '../../domain/watch_providers/entities/WatchProviders';

export interface WatchProviderDataSource {
    getWatchProvider(itemId: string, itemType: string): Promise<WatchProvider[]>;
}

class WatchProviderRepositoryImpl implements WatchProviderDataSource {

    constructor(private remoteDataSource: WatchProviderRemoteDataSource) {}

    async getWatchProvider(itemId: string, itemType: string): Promise<WatchProvider[]> {
        const resp = await this.remoteDataSource.getWatchProviderByMovieId(itemId, itemType)
        return watchProviderResponseToDomain(resp)
    }
}

export default WatchProviderRepositoryImpl;