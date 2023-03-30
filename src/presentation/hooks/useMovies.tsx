import { useEffect, useState } from 'react'
import { genres, CustomGenre } from '../../data/genre/local/CustomGenres';
import { getNowPlayingUseCase } from '../../domain/movie/usecases/getNowPlayingUseCase';
import { Movie } from '../../domain/movie/entities/Movies';
import { getPopularUseCase } from '../../domain/movie/usecases/getPopularUseCase';
import { getTopRatedUseCase } from '../../domain/movie/usecases/geTopRatedUseCase';
import { errorHandler } from '../base/errorHandler';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    genres: CustomGenre[];
    errorMessage?: string,
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        genres: [],
    })

    const getMoviesNowPlaying = async () => {
        const nowPlayingProm = getNowPlayingUseCase();
        const popularProm = getPopularUseCase();
        const topRatedProm = getTopRatedUseCase();
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

