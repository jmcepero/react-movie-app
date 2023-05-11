import { MovieDataSource } from '../../../data/movie/MovieRepository';
import { Movie } from '../entities/Movies';

class GetMovieDetailUseCase {

    constructor(private repository: MovieDataSource) { }

    async execute(movieId: string): Promise<Movie> {
        return this.repository.getMovieDetail(movieId)
    }
}

export default GetMovieDetailUseCase;