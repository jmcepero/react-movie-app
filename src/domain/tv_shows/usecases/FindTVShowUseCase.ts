import {tvShowRepository} from '../../../data/tv_shows/TVShowRepository';
import {TVShows} from '../entities/TVShows';

export const findTVShowUseCase = {
  async execute(term: string, page: number): Promise<TVShows> {
    return tvShowRepository.findTVShows(term, page);
  },
};
