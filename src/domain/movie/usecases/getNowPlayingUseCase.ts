import { IMovieRepository } from "../../../data/movie/MovieRepository"
import { Movies } from "../entities/Movies"

class GetNowPlayingUseCase {

    constructor(private repository: IMovieRepository) {}

    async execute(page?: number): Promise<Movies> {
        return this.repository.getNowPlaying(page)
    }
}

export default GetNowPlayingUseCase;