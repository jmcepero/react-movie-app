import { Movie } from "../../../domain/movie/entities/Movies";

export interface MovieResult {
    isLoading: boolean;
    pageLoading: boolean,
    result: Movie[];
    page: number;
    error: string;
}