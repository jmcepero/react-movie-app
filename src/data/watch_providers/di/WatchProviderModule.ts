import WatchProviderRepository from '../WatchProviderRepository';
import WatchProviderRemoteDataSourceImpl from '../remote/WatchProviderRemoteDataSource';

const watchProviderRemoteDataSource = new WatchProviderRemoteDataSourceImpl()

export default() => {
    return {
        WatchProviderRepository: new WatchProviderRepository(watchProviderRemoteDataSource)
    }
}