import { TVShow, TVShows } from "../../domain/tv_shows/entities/TVShows";
import { tvShowsResponseToDomain, tvShowDetailResponseToDomain } from './mapper/TVShowMapper';
import { TVShowRemoteDataSource } from './remote/TVShowRemoteDataSource';
import { genres } from '../genre/local/CustomGenres';

export interface TVShowDataSource {
    getOnTheAir(page?: number): Promise<TVShows>;
    getPopular(page?: number): Promise<TVShows>;
    getTopRated(page?: number): Promise<TVShows>;
    getTVShowDetail(tvShowId: string): Promise<TVShow>;
    findTVShows(term: string, page: number): Promise<TVShows>;
}

class TVShowRepository implements TVShowDataSource {

    constructor(private remoteDataSource: TVShowRemoteDataSource) {}

    async getOnTheAir(page?: number | undefined): Promise<TVShows> {
        const [onTheAir, genres] = await Promise.all([
            this.remoteDataSource.getTVShowByClasification('on_the_air',page),
            this.remoteDataSource.getTVgenres()
        ]);
        return tvShowsResponseToDomain(onTheAir, genres);
    }

    async getPopular(page?: number): Promise<TVShows> {
        const [popular, genres] = await Promise.all([
            this.remoteDataSource.getTVShowByClasification('popular',page),
            this.remoteDataSource.getTVgenres()
        ]);
        return tvShowsResponseToDomain(popular, genres);
    }

    async getTopRated(page?: number): Promise<TVShows> {
        const [topRated, genres] = await Promise.all([
            this.remoteDataSource.getTVShowByClasification('top_rated',page),
            this.remoteDataSource.getTVgenres()
        ]);
        return tvShowsResponseToDomain(topRated, genres);
    }

    async getTVShowDetail(tvShowId: string): Promise<TVShow> {
        const resp = await this.remoteDataSource.getTVShowDetail(tvShowId);
        return tvShowDetailResponseToDomain(resp);
    }

    async findTVShows(term: string, page: number): Promise<TVShows> {
        const resp = await this.remoteDataSource.findTVShows(term, page);
        return tvShowsResponseToDomain(resp)
    }
}

export default TVShowRepository;