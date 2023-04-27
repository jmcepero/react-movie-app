import { useEffect, useState } from 'react'
import { genres, CustomGenre } from '../../data/genre/local/CustomGenres';
import di from '../../di';
import { Movie } from '../../domain/movie/entities/Movies';
import { errorHandler } from '../base/errorHandler';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    genres: CustomGenre[];
    errorMessage?: string,
}

export const useMovies = () => {

    const getNowPlayingUseCase = di.GetNowPlayingUseCase;
    const getPopularUseCase = di.GetPopularUseCase;
    const getTopRatedUseCase = di.GetTopRatedUseCase;
    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        genres: [],
    })

    const getMoviesNowPlaying = async () => {
        const nowPlayingProm = getNowPlayingUseCase.execute();
        const popularProm = getPopularUseCase.execute();
        const topRatedProm = getTopRatedUseCase.execute();
        try {
            const [
                nowPlayingRes,
                popularRes,
                topRatedRes
            ] = await Promise.all([nowPlayingProm, popularProm, topRatedProm])

            setMoviesState({
                nowPlaying: nowPlayingRes.results.slice(0, 8),
                popular: popularRes.results,
                topRated: topRatedRes.results,
                genres: genres
            })
        } catch (error) {
            const { message } = errorHandler(error);
            setMoviesState({
                ...moviesState,
                errorMessage: message
            })
        }


        setIsLoading(false)
    }

    useEffect(() => {
        getMoviesNowPlaying();
    }, [])

    return {
        isLoading,
        ...moviesState
    }
}

