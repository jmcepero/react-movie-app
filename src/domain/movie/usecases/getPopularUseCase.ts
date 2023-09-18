import {movieRepository} from '../../../data/movie/MovieRepository';
import {Movies} from '../entities/Movies';

export const getPopularUseCase = {
  async execute(page?: number): Promise<Movies> {
    return movieRepository.getPopular(page);
  },
};
