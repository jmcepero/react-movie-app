import { useEffect, useState } from 'react'
import { getNowPlayingUseCase } from '../../domain/movie/usecases/getNowPlayingUseCase';
import { Movies } from '../../domain/movie/entities/Movies';
import { errorHandler } from '../base/errorHandler';

interface MoviesState {
    nowPlaying: Movies | undefined;
    error?: string
}

export const useMoviesError = () => {

    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: undefined,
    })

    const getMoviesNowPlaying = async () => {
        const nowtestPro = getNowPlayingUseCase()
        try {
            const [nowPlayingResp] = await Promise.all([nowtestPro])
            setMoviesState({
                nowPlaying: nowPlayingResp,
                error: undefined
            })
        } catch (error) {
            const { message } = errorHandler(error);
            setMoviesState({
                nowPlaying: undefined,
                error: message
            })
        }
    }

    useEffect(() => {
        getMoviesNowPlaying();
    }, [])

    return {
        ...moviesState
    }
}
