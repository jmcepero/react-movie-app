import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB'
import { genres, CustomGenre } from '../interfaces/CustomGenres';
import { Genre, GenresResponse, Movie, MoviesResponse } from '../interfaces/MovieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
    genres: CustomGenre[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
        genres: [],
    })

    const getMoviesNowPlaying = async () => {
        const nowPlayingProm = movieDB.get<MoviesResponse>('movie/now_playing');
        const popularProm = movieDB.get<MoviesResponse>('movie/popular');
        const topRatedProm = movieDB.get<MoviesResponse>('movie/top_rated');
        const upcomingProm = movieDB.get<MoviesResponse>('movie/upcoming');
        const resp = await Promise.all([nowPlayingProm, popularProm, topRatedProm, upcomingProm])

        setMoviesState({
            nowPlaying: resp[0].data.results.slice(0, 8),
            popular: resp[1].data.results,
            topRated: resp[2].data.results,
            upcoming: resp[3].data.results,
            genres: genres
        })

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
