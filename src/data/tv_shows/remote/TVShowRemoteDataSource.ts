import movieDB from "../../api/movieDB";
import { TVGenresResponse, TVShowDetailResponse, TVShowsResponse } from "../entities/TVShowsInterface";
import { genres } from '../../genre/local/CustomGenres';

export interface TVShowRemoteDataSource {
    getTVShowByClasification(clasification: string, page?: number): Promise<TVShowsResponse>;
    getTVgenres(): Promise<TVGenresResponse>
    getTVShowDetail(tvShowId: string): Promise<TVShowDetailResponse>;
    findTVShows(term: string, page: number): Promise<TVShowsResponse>;
}

class TVShowRemoteDataSourceImpl implements TVShowRemoteDataSource {

    async getTVShowByClasification(clasification: string, page?: number): Promise<TVShowsResponse> {
        let url = `tv/${clasification}`
        if (page) {
            url = url + `?page=${page}`
        }
        const resp = await movieDB.get<TVShowsResponse>(url);

        return resp.data
    }

    async getTVgenres(): Promise<TVGenresResponse> {
        const resp = await movieDB.get<TVGenresResponse>('genre/tv/list')
        return resp.data
    }

    async getTVShowDetail(tvShowId: string): Promise<TVShowDetailResponse> {
        const resp = await movieDB.get<TVShowDetailResponse>(`tv/${tvShowId}?append_to_response=videos,reviews,credits`)
        return resp.data
    }

    async findTVShows(term: string, page: number): Promise<TVShowsResponse> {
        let url = `search/tv?query=${term}&page=${page}`
        const resp = await movieDB.get<TVShowsResponse>(url);
        return resp.data
    }
}



export default TVShowRemoteDataSourceImpl;