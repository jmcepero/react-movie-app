import MovieRepository, { MovieDataSource } from '../../../data/movie/MovieRepository';
import { Movies } from '../entities/Movies';

class GetPopularUseCase {

    constructor(private repository: MovieDataSource) {}

    async execute(page?: number): Promise<Movies> {
        return this.repository.getPopular(page)
    }
}

export default GetPopularUseCase;