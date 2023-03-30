import movieDB from "../../api/movieDB";
import { MoviesResponse } from "../entities/MovieInterface";

export class MovieRemoteDataSource {

    async getMoviesByClasification(clasification: string): Promise<MoviesResponse> {
        const resp =  await movieDB.get<MoviesResponse>(`movie/${clasification}`);
        return resp.data
    }
}

