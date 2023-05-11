import { TVShowDataSource } from '../../../data/tv_shows/TVShowRepository';
import { TVShows } from '../entities/TVShows';

class GetTVShowsPouplarUseCase {

    constructor(private repository: TVShowDataSource) {}

    async execute(page?: number): Promise<TVShows> {
        return this.repository.getPopular(page)
    }
}

export default GetTVShowsPouplarUseCase;