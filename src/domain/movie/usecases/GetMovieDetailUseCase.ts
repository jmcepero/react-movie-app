import {movieRepository} from '../../../data/movie/MovieRepository';
import {Movie} from '../entities/Movies';

export const getMovieDetailUseCase = {
  async execute(movieId: string): Promise<Movie> {
    return movieRepository.getMovieDetail(movieId);
  },
};
