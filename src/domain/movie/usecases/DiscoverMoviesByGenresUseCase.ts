import {Movies} from '../entities/Movies';
import {movieRepository} from '../../../data/movie/MovieRepository';

export const discoverMoviesByGenresUseCase = {
  async execute(genres: string[], page?: number): Promise<Movies> {
    return movieRepository.discoverMoviesByGenres(genres, page);
  },
};
