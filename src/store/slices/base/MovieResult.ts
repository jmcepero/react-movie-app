import { Movie } from "../../../domain/movie/entities/Movies";
import { TVShow } from '../../../domain/tv_shows/entities/TVShows';
import { Item } from '../../../domain/base/Item';

export interface MovieResult {
    isLoading: boolean;
    pageLoading: boolean,
    result: Item[];
    page: number;
    error: string;
}