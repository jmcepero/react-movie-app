import movieDB from "../../api/movieDB";
import { WatchProvidersResponse } from "../entities/WatchProviderInterface";

export interface WatchProviderRemoteDataSource {
    getWatchProviderByMovieId(itemId: string, itemType: string) : Promise<WatchProvidersResponse>;
}

class WatchProviderRemoteDataSourceImpl implements WatchProviderRemoteDataSource {

    async getWatchProviderByMovieId(itemId: string, itemType: string): Promise<WatchProvidersResponse> {
       let url = `${itemType === 'movie' ? 'movie' : 'tv'}/${itemId}/watch/providers`
       const resp = await movieDB.get<WatchProvidersResponse>(url);

       return resp.data
   }
}

export default WatchProviderRemoteDataSourceImpl;