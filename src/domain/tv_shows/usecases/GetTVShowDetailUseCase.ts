import { TVShowDataSource } from '../../../data/tv_shows/TVShowRepository';
import { TVShow, TVShows } from '../entities/TVShows';

class GetTVShowDetailUseCase {

    constructor(private repository: TVShowDataSource) {}

    async execute(tvShowId: string): Promise<TVShow> {
        return this.repository.getTVShowDetail(tvShowId);
    }
}

export default GetTVShowDetailUseCase;