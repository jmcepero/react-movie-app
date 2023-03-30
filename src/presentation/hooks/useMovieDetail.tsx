import { useEffect, useState } from 'react'
import movieDB from '../../data/api/movieDB'
import { Cast, CreditsResponse, MovieDetailResponse, VideoResponse, VideoDetail, ReviewResponse, Review } from '../../data/movie/entities/MovieInterface';

interface MoviesDetailState {
    detail?: MovieDetailResponse,
    director: string,
    cast: Cast[],
    trailerUri: string,
    reviews: Review[]
}

export const useMovieDetail = (movieId: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieDetailState, setMovieDetailState] = useState<MoviesDetailState>({
        detail: undefined,
        director: '',
        cast: [],
        trailerUri: '',
        reviews: []
    })

    const getMovieDetail = async () => {
        const movieDetailProm = movieDB.get<MovieDetailResponse>(`movie/${movieId}`);
        const creditsProm = movieDB.get<CreditsResponse>(`movie/${movieId}/credits`);
        const videoProm = movieDB.get<VideoResponse>(`movie/${movieId}/videos`);
        const reviewsProm = movieDB.get<ReviewResponse>(`movie/${movieId}/reviews`);
        const resp = await Promise.all([movieDetailProm, creditsProm, videoProm, reviewsProm])
        const directorFilter = resp[1].data.crew.filter((cast) => {
            return cast.known_for_department === 'Directing'
        })
        const trailerUris = resp[2].data.results.filter((video) => {
            return video.type === 'Trailer'
        })

        setMovieDetailState({
            detail: resp[0].data,
            director: (directorFilter.length > 0 ? directorFilter[0].name : ''),
            cast: resp[1].data.cast,
            trailerUri: (trailerUris.length > 0 ? trailerUris[0].key : ''),
            reviews: resp[3].data.results
        })

        setIsLoading(false)
    }

    useEffect(() => {
        getMovieDetail();
    }, [])

    return {
        isLoading,
        ...movieDetailState
    }
}
