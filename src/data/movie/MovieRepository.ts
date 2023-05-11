import { movieDetailResponseToDetail, moviesResponseToDomain } from './mapper/MovieMapper';
import { Movie, Movies } from "../../domain/movie/entities/Movies";
import { MovieRemoteDataSource } from './remote/MovieRemoteDataSource';

export interface MovieDataSource {
    getNowPlaying(page?: number): Promise<Movies>;
    getPopular(page?: number): Promise<Movies>;
    getTopRated(page?: number): Promise<Movies>;
    findMovies(term: string, page: number): Promise<Movies>;
    getMovieDetail(movieId: string): Promise<Movie>;
}

class MovieRepository implements MovieDataSource {

    constructor(private remoteDataSource: MovieRemoteDataSource) {}

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

    async getMovieDetail(movieId: string): Promise<Movie> {
        const resp = await this.remoteDataSource.getMovieDetail(movieId);
        return movieDetailResponseToDetail(resp)
    }
}

export default MovieRepository;