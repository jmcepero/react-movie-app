import { MoviesResponse } from "../entities/MovieInterface";
import { Movies } from '../../../domain/movie/entities/Movies';

export const moviesResponseToDomain = (moviesResponse: MoviesResponse): Movies => ({
        dates: {
            maximum: moviesResponse.dates?.maximum || '',
            minimum: moviesResponse.dates?.minimum || ''
        },
        page: moviesResponse.page,
        results: moviesResponse.results.map((movie) => {
            return {
                adult: movie.adult,
                backdropPath: movie.backdrop_path,
                genreIds: movie.genre_ids,
                id: movie.id,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                popularity: movie.popularity,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
                title: movie.title,
                video: movie.video,
                voteAverage: movie.vote_average,
                voteCount: movie.vote_count,
            }
        }),
        totalPages: moviesResponse.total_pages,
        totalResults: moviesResponse.total_results,
    }
)