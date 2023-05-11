import { Movies } from '../entities/Movies';
import { MovieDataSource } from '../../../data/movie/MovieRepository';

class FindMoviesUseCase {

    constructor(private repository: MovieDataSource) {}

    execute(term: string, page: number): Promise<Movies> {
        return this.repository.findMovies(term, page);
    }
}

export default FindMoviesUseCase;