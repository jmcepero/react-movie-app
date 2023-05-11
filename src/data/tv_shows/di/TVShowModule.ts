import TVShowRemoteDataSourceImpl from '../remote/TVShowRemoteDataSource';
import TVShowRepository from '../TVShowRepository';

const tvShowRemoteDataSource = new TVShowRemoteDataSourceImpl()

export default() => {
    return {
        TvShowRepository: new TVShowRepository(tvShowRemoteDataSource)
    }
}