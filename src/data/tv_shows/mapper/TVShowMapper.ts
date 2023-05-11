import { TVShowsResponse, TVGenresResponse, TVShowDetailResponse } from '../entities/TVShowsInterface';
import { TVShows, TVShow } from '../../../domain/tv_shows/entities/TVShows';

export const tvShowsResponseToDomain = (tvShowsResponse: TVShowsResponse, genres?: TVGenresResponse): TVShows => ({
    page: tvShowsResponse.page,
    results: tvShowsResponse.results.map((tvShow) => {

        const customGenres = genres?.genres.filter((item) => {
            return tvShow.genre_ids.includes(item.id)
        }).map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })

        return {
            backdropPath: tvShow.backdrop_path || '',
            firstAirDate: tvShow.first_air_date,
            genreIds: customGenres || [],
            id: tvShow.id,
            name: tvShow.name,
            originCountry: tvShow.origin_country,
            originalLanguage: tvShow.original_language,
            originalName: tvShow.original_name,
            overview: tvShow.overview,
            popularity: tvShow.popularity,
            posterPath: tvShow.poster_path,
            voteAverage: tvShow.vote_average,
            voteCount: tvShow.vote_count,
        }
    }),
    totalPages: tvShowsResponse.total_pages,
    totalResults: tvShowsResponse.total_results,
})

export const tvShowDetailResponseToDomain = (tvShowDetailResponse: TVShowDetailResponse): TVShow => {

    return {
        backdropPath: tvShowDetailResponse.backdrop_path,
        firstAirDate: tvShowDetailResponse.first_air_date,
        genreIds: tvShowDetailResponse.genres.map((item) => ({
            id: item.id,
            name: item.name
        })),
        id: tvShowDetailResponse.id,
        name: tvShowDetailResponse.name,
        originCountry: tvShowDetailResponse.origin_country,
        originalLanguage: tvShowDetailResponse.original_language,
        originalName: tvShowDetailResponse.original_name,
        overview: tvShowDetailResponse.overview,
        popularity: tvShowDetailResponse.popularity,
        posterPath: tvShowDetailResponse.poster_path,
        voteAverage: tvShowDetailResponse.vote_average,
        voteCount: tvShowDetailResponse.vote_count,
        credits: tvShowDetailResponse.credits ? {
            cast: tvShowDetailResponse.credits.cast.map((item) => ({
                id: item.id,
                knownForDepartment: item.known_for_department,
                name: item.name,
                originalName: item.original_name,
                profilePath: item.profile_path
            })),
            crew: tvShowDetailResponse.credits.crew.map((item) => ({
                id: item.id,
                knownForDepartment: item.known_for_department,
                name: item.name,
                originalName: item.original_name,
                profilePath: item.profile_path
            }))
        } : undefined,
        director: tvShowDetailResponse.credits ? tvShowDetailResponse.credits.crew.find((cast) => {
            return cast.known_for_department === 'Directing'
        })?.name : undefined,
        trailer: tvShowDetailResponse.videos ? tvShowDetailResponse.videos.results.find((video) => {
            return video.type === 'Trailer'
        })?.key : undefined,
        reviews: tvShowDetailResponse.reviews ? {
            results: tvShowDetailResponse.reviews.results.map((item) => ({
                author: item.author,
                authorDetails: {
                    name: item.author_details.name,
                    username: item.author_details.username,
                    avatarPath: item.author_details.avatar_path,
                    rating: item.author_details.rating
                },
                content: item.content,
                createdAt: item.created_at,
                id: item.id,
                updatedAt: item.updated_at,
                url: item.url
            }))
        } : undefined,
        seasons: tvShowDetailResponse.seasons.map((item) => ({
            airDate: item.air_date,
            episodeCount: item.episode_count,
            id: item.id,
            name: item.name,
            overview: item.overview,
            posterPath: item.poster_path,
            seasonNumber: item.season_number
        }))
    }
}