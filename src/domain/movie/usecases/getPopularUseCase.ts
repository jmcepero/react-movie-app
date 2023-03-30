import { MovieRepository } from '../../../data/movie/MovieRepository';
import { MovieRemoteDataSource } from '../../../data/movie/remote/MovieRemoteDataSource';

export const getPopularUseCase = async () => {
    const repository = new MovieRepository(new MovieRemoteDataSource())
    return repository.getPopular()
}