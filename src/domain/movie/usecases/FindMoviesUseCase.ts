import {Movies} from '../entities/Movies';
import {movieRepository} from '../../../data/movie/MovieRepository';

export const findMoviesUseCase = {
  async execute(term: string, page: number): Promise<Movies> {
    return movieRepository.findMovies(term, page);
  },
};
