import MovieRemoteDataSource from '../remote/MovieRemoteDataSource';
import MovieRepository from '../MovieRepository';
import MovieRemoteDataSourceImpl from '../remote/MovieRemoteDataSource';

const movieRemoteDataSource = new MovieRemoteDataSourceImpl()

export default() => {
    return {
        MovieRepository: new MovieRepository(movieRemoteDataSource)
    }
}