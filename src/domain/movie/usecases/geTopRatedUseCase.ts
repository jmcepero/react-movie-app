import { IMovieRepository } from '../../../data/movie/MovieRepository';
import { Movies } from '../entities/Movies';

class GetTopRatedUseCase {

    constructor(private repository: IMovieRepository) {}
    
    async execute(page?: number): Promise<Movies> {
        return this.repository.getTopRated(page)
    }
}

export default GetTopRatedUseCase;