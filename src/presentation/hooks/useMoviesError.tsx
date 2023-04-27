import { useEffect, useState } from 'react'
import { Movies } from '../../domain/movie/entities/Movies';
import { errorHandler } from '../base/errorHandler';
import GetNowPlayingUseCase from '../../domain/movie/usecases/GetNowPlayingUseCase';
import di from '../../di';

interface MoviesState {
    nowPlaying: Movies | undefined;
    error?: string
}

export const useMoviesError = () => {

    const useCase = di.GetPopularUseCase
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: undefined,
    })

    const getMoviesNowPlaying = async () => {
        try {
            const [nowPlayingResp] = await Promise.all([useCase.execute()])
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
