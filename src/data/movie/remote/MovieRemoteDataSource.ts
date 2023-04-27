import movieDB from "../../api/movieDB";
import { MoviesResponse } from "../entities/MovieInterface";

export interface IMovieRemoteDataSource {
    getMoviesByClasification(clasification: string, page?: number) : Promise<MoviesResponse>;
    findMovies(term: string, page: number): Promise<MoviesResponse>
}

class MovieRemoteDataSource implements IMovieRemoteDataSource {

     async getMoviesByClasification(clasification: string, page?: number): Promise<MoviesResponse> {
        let url = `movie/${clasification}`
        if (page) {
            url = url + `?page=${page}`
            console.log(url)
        }
        const resp = await movieDB.get<MoviesResponse>(url);

        return resp.data
    }

    async findMovies(term: string, page: number): Promise<MoviesResponse> {
        let url = `search/movie?query=${term}&page=${page}`
        const resp = await movieDB.get<MoviesResponse>(url);
        return resp.data
    }
}

export default MovieRemoteDataSource;

