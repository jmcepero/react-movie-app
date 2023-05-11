import { MovieDataSource } from '../../../data/movie/MovieRepository';
import { Movies } from '../entities/Movies';

class GetTopRatedUseCase {

    constructor(private repository: MovieDataSource) {}
    
    async execute(page?: number): Promise<Movies> {
        return this.repository.getTopRated(page)
    }
}

export default GetTopRatedUseCase;