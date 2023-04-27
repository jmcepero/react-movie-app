import MovieRepository, { IMovieRepository } from '../../../data/movie/MovieRepository';
import { Movies } from '../entities/Movies';

class GetPopularUseCase {

    constructor(private repository: IMovieRepository) {}

    async execute(page?: number): Promise<Movies> {
        return this.repository.getPopular(page)
    }
}

export default GetPopularUseCase;