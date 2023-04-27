import { moviesResponseToDomain } from './mapper/MovieMapper';
import { Movies } from "../../domain/movie/entities/Movies";
import { IMovieRemoteDataSource } from './remote/MovieRemoteDataSource';

export interface IMovieRepository {
    getNowPlaying(page?: number): Promise<Movies>;
    getPopular(page?: number): Promise<Movies>;
    getTopRated(page?: number): Promise<Movies>;
    findMovies(term: string, page: number): Promise<Movies>;
}

class MovieRepository implements IMovieRepository {

    constructor(private remoteDataSource: IMovieRemoteDataSource) {}

    async getNowPlaying(page?: number): Promise<Movies> {
        const resp = await this.remoteDataSource.getMoviesByClasification('now_playing', page);
        return moviesResponseToDomain(resp)
    }

    async getPopular(page?: number): Promise<Movies> {
        const resp = await this.remoteDataSource.getMoviesByClasification('popular', page);
        return moviesResponseToDomain(resp)
    }

    async getTopRated(page?: number): Promise<Movies> {
        const resp = await this.remoteDataSource.getMoviesByClasification('top_rated', page);
        return moviesResponseToDomain(resp)
    }

    async findMovies(term: string, page: number): Promise<Movies> {
        const resp = await this.remoteDataSource.findMovies(term, page);
        return moviesResponseToDomain(resp)
    }
}

export default MovieRepository;