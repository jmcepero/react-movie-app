import { MovieRemoteDataSource } from "./remote/MovieRemoteDataSource";
import { moviesResponseToDomain } from './mapper/MovieMapper';
import { Movies } from "../../domain/movie/entities/Movies";

export class MovieRepository {
    remoteDataSource: MovieRemoteDataSource;

    constructor(remoteDataSource: MovieRemoteDataSource) {
        this.remoteDataSource = remoteDataSource
    }

    async getNowPlaying() : Promise<Movies> {
        const resp = await this.remoteDataSource.getMoviesByClasification('now_playing');
        return moviesResponseToDomain(resp)
    }

    async getPopular() : Promise<Movies> {
        const resp = await this.remoteDataSource.getMoviesByClasification('popular');
        return moviesResponseToDomain(resp)
    }

    async getTopRated() : Promise<Movies> {
        const resp = await this.remoteDataSource.getMoviesByClasification('top_rated');
        return moviesResponseToDomain(resp)
    }
}