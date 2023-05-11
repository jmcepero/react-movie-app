import { MovieDataSource } from "../../../data/movie/MovieRepository"
import { Movies } from "../entities/Movies"

class GetNowPlayingUseCase {

    constructor(private repository: MovieDataSource) {}

    async execute(page?: number): Promise<Movies> {
        return this.repository.getNowPlaying(page)
    }
}

export default GetNowPlayingUseCase;