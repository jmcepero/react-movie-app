import { MoviesResponse } from "../entities/MovieInterface";
import { Movies } from '../../../domain/movie/entities/Movies';

export const moviesResponseToDomain = (moviesResponse: MoviesResponse): Movies => ({
        dates: {
            maximum: new Date(moviesResponse.dates?.maximum || ''),
            minimum: new Date(moviesResponse.dates?.minimum || '')
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
                releaseDate: new Date(movie.release_date || ''),
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