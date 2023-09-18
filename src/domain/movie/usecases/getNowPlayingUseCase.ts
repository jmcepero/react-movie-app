import {movieRepository} from '../../../data/movie/MovieRepository';
import {Movies} from '../entities/Movies';

export const getNowPlayingUseCase = {
  async execute(page?: number): Promise<Movies> {
    return movieRepository.getNowPlaying(page);
  },
};
