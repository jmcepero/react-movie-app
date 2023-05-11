import { WatchProviderDataSource } from '../../../data/watch_providers/WatchProviderRepository';
import GetWatchProviderUseCase from '../usecases/GetWatchProvidersUseCase';

export default (watchProviderRepository: WatchProviderDataSource) => {
    return {
        getWatchProviderByMovieId: new GetWatchProviderUseCase(watchProviderRepository),
    }
}