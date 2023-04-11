import movieDB from "../../api/movieDB";
import { MoviesResponse } from "../entities/MovieInterface";

export class MovieRemoteDataSource {

    async getMoviesByClasification(clasification: string, page?: number): Promise<MoviesResponse> {
        let url = `movie/${clasification}`
        if(page){
            url = url + `?page=${page}`
            console.log(url)
        }
        const resp =  await movieDB.get<MoviesResponse>(url);
        
        return resp.data
    }
}

