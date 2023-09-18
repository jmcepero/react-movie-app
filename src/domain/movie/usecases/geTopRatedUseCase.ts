import {movieRepository} from '../../../data/movie/MovieRepository';
import {Movies} from '../entities/Movies';

export const getTopRatedUseCase = {
  async execute(page?: number): Promise<Movies> {
    return movieRepository.getTopRated(page);
  },
};
