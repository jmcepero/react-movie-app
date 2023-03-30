import { MovieRepository } from '../../../data/movie/MovieRepository';
import { MovieRemoteDataSource } from '../../../data/movie/remote/MovieRemoteDataSource';

export const getTopRatedUseCase = async () => {
    const repository = new MovieRepository(new MovieRemoteDataSource())
    return repository.getTopRated()
}