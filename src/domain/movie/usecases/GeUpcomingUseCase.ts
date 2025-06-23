import { movieRepository } from '@data/movie/MovieRepository';
import { Movies } from '../entities/Movies';

export const getUpcomingUseCase = {
  async execute(page?: number): Promise<Movies> {
    return movieRepository.getUpcoming(page);
  },
};
