import {Movies} from '../entities/Movies';
import {movieRepository} from '../../../data/movie/MovieRepository';

export const userMoviesByGenresUseCase = {
  async execute(userId: string, page?: number): Promise<Movies> {
    return movieRepository.userMoviesByGenres(userId, page);
  },
};
