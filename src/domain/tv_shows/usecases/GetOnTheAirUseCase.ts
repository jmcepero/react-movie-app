import { TVShowDataSource } from '../../../data/tv_shows/TVShowRepository';
import { TVShows } from '../entities/TVShows';

class GetOnTheAirUseCase {

    constructor(private repository: TVShowDataSource) {}

    async execute(page?: number): Promise<TVShows> {
        return this.repository.getOnTheAir(page)
    }
}

export default GetOnTheAirUseCase;