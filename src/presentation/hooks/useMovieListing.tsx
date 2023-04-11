import React, { useEffect, useState } from 'react'
import { Movie } from '../../domain/movie/entities/Movies';
import { getPopularUseCase } from '../../domain/movie/usecases/getPopularUseCase';
import { errorHandler } from '../base/errorHandler';

interface MovieListingState {
    mainLoading: boolean,
    pageLoading: boolean,
    movies: Movie[],
    errorMessage?: string
}

export const useMovieListing = () => {
    const [page, setPage] = useState(1);
    const [movieListingState, setMovieListingState] = useState<MovieListingState>({
        mainLoading: false,
        pageLoading: false,
        movies: [],
    })

    const getPopularMovies = async (page: number) => {
        console.log(page.toString())
        const popularProm = getPopularUseCase(page)
        try {
            const popularRes = await popularProm
            console.log('current page' + popularRes.page.toString())
            setMovieListingState({
                ...movieListingState,
                mainLoading: false,
                pageLoading: false,
                movies: movieListingState.movies.concat(popularRes.results)
            })
        } catch (error) {
            const { message } = errorHandler(error);
            console.log(error)
            setMovieListingState({
                ...movieListingState,
                mainLoading: false,
                pageLoading: false,
                errorMessage: message
            })
        }
    }

    useEffect(() => {
        setMovieListingState({
            ...movieListingState,
            mainLoading: page === 1,
            pageLoading: true
        })

        getPopularMovies(page)
    }, [page])
    

    const onReachToEnd = () => {
        setPage(page + 1)
    }

    return {
        ...movieListingState,
        onReachToEnd
    }
}
