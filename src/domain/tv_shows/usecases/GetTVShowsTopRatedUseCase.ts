import { TVShowDataSource } from '../../../data/tv_shows/TVShowRepository';
import { TVShows } from '../entities/TVShows';

class GetTVShowsTopRatedUseCas {

    constructor(private repository: TVShowDataSource) {}

    async execute(page?: number): Promise<TVShows> {
        return this.repository.getTopRated(page)
    }
}

export default GetTVShowsTopRatedUseCas;