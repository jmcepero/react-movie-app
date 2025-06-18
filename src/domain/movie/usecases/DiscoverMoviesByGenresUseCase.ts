import { Movies } from '../entities/Movies';
import { movieRepository } from '../../../data/movie/MovieRepository';

export const discoverMoviesByGenresUseCase = {
  async execute(
    movieFilterRequest?: Map<string, string>,
    page?: number,
  ): Promise<Movies> {
    return movieRepository.discoverMovies(movieFilterRequest, page);
  },
};
