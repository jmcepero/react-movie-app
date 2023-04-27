import { Movies } from '../entities/Movies';
import { IMovieRepository } from '../../../data/movie/MovieRepository';

class FindMoviesUseCase {

    constructor(private repository: IMovieRepository) {}

    execute(term: string, page: number): Promise<Movies> {
        return this.repository.findMovies(term, page);
    }
}

export default FindMoviesUseCase;