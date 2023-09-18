import {tvShowRepository} from '../../../data/tv_shows/TVShowRepository';
import {TVShow} from '../entities/TVShows';

export const getTVShowDetailUseCase = {
  async execute(tvShowId: string): Promise<TVShow> {
    return tvShowRepository.getTVShowDetail(tvShowId);
  },
};
