import { IMovieRemoteDataSource } from '../remote/MovieRemoteDataSource';
import MovieRemoteDataSource from '../remote/MovieRemoteDataSource';
import MovieRepository from '../MovieRepository';

const movieRemoteDataSource = new MovieRemoteDataSource()

export default() => {
    return {
        MovieRepository: new MovieRepository(movieRemoteDataSource)
    }
}