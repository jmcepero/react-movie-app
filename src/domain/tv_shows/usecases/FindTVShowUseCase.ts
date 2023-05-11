import { TVShowDataSource } from '../../../data/tv_shows/TVShowRepository';
import { TVShows } from '../entities/TVShows';

class FindTVShowUseCase {

    constructor(private repository: TVShowDataSource) { }

    async execute(term: string, page: number): Promise<TVShows> {
        return this.repository.findTVShows(term, page)
    }
}

export default FindTVShowUseCase;