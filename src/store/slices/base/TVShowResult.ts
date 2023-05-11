import { TVShow } from "../../../domain/tv_shows/entities/TVShows";

export interface MovieResult {
    isLoading: boolean;
    pageLoading: boolean,
    result: TVShow[];
    page: number;
    error: string;
}