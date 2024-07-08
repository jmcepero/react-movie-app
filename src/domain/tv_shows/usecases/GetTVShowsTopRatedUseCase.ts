import {tvShowRepository} from '../../../data/tv_shows/TVShowRepository';
import {TVShows} from '../entities/TVShows';

export const getTVShowsTopRatedUseCase = {
  async execute(page?: number): Promise<TVShows> {
    return tvShowRepository.getTopRated(page);
  },
};
