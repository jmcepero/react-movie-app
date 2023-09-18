import {TVShow, TVShows} from '../../domain/tv_shows/entities/TVShows';
import {
  tvShowsResponseToDomain,
  tvShowDetailResponseToDomain,
} from './mapper/TVShowMapper';
import {tvShowRemoteDataSourceImpl} from './remote/TVShowRemoteDataSource';

export interface TVShowDataSource {
  getOnTheAir(page?: number): Promise<TVShows>;
  getPopular(page?: number): Promise<TVShows>;
  getTopRated(page?: number): Promise<TVShows>;
  getTVShowDetail(tvShowId: string): Promise<TVShow>;
  findTVShows(term: string, page: number): Promise<TVShows>;
}

export const tvShowRepository: TVShowDataSource = {
  async getOnTheAir(page?: number | undefined): Promise<TVShows> {
    const [onTheAir, genres] = await Promise.all([
      tvShowRemoteDataSourceImpl.getTVShowByClasification('on_the_air', page),
      tvShowRemoteDataSourceImpl.getTVgenres(),
    ]);
    return tvShowsResponseToDomain(onTheAir, genres);
  },
  async getPopular(page?: number): Promise<TVShows> {
    const [popular, genres] = await Promise.all([
      tvShowRemoteDataSourceImpl.getTVShowByClasification('popular', page),
      tvShowRemoteDataSourceImpl.getTVgenres(),
    ]);
    return tvShowsResponseToDomain(popular, genres);
  },
  async getTopRated(page?: number): Promise<TVShows> {
    const [topRated, genres] = await Promise.all([
      tvShowRemoteDataSourceImpl.getTVShowByClasification('top_rated', page),
      tvShowRemoteDataSourceImpl.getTVgenres(),
    ]);
    return tvShowsResponseToDomain(topRated, genres);
  },
  async getTVShowDetail(tvShowId: string): Promise<TVShow> {
    const resp = await tvShowRemoteDataSourceImpl.getTVShowDetail(tvShowId);
    return tvShowDetailResponseToDomain(resp);
  },
  async findTVShows(term: string, page: number): Promise<TVShows> {
    const resp = await tvShowRemoteDataSourceImpl.findTVShows(term, page);
    return tvShowsResponseToDomain(resp);
  },
};
