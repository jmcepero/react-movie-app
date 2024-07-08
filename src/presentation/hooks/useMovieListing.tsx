import {useEffect, useState} from 'react';
import {errorHandler} from '../base/errorHandler';
import {SearchesResult} from './base/MovieResult';
import {getTopRatedUseCase} from '../../domain/movie/usecases/GeTopRatedUseCase';
import {getPopularUseCase} from '../../domain/movie/usecases/GetPopularUseCase';

const initialListingState: SearchesResult = {
  isLoading: false,
  pageLoading: false,
  result: [],
  page: 1,
  error: '',
};

export const useMovieListing = (params: string) => {
  const [movieListingState, setMovieListingState] =
    useState<SearchesResult>(initialListingState);

  useEffect(() => {
    loadMovies(movieListingState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    loadMovies(movieListingState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieListingState.page]);

  const loadMovies = async (page: number) => {
    const useCase =
      params === 'popular' ? getPopularUseCase : getTopRatedUseCase;

    setMovieListingState({
      ...movieListingState,
      isLoading: page === 1,
      pageLoading: page > 1,
    });
    try {
      const data = await useCase.execute(page);
      const resultList =
        page === 1
          ? data.results
          : [...movieListingState.result, ...data.results];
      setMovieListingState({
        ...movieListingState,
        isLoading: false,
        pageLoading: false,
        result: resultList,
        error: '',
      });
    } catch (error) {
      const {message} = errorHandler(error);
      setMovieListingState({
        ...movieListingState,
        isLoading: false,
        pageLoading: false,
        error: message,
      });
    }
  };

  const onReachToEnd = () => {
    setMovieListingState({
      ...movieListingState,
      page: movieListingState.page + 1,
    });
  };

  return {
    ...movieListingState,
    onReachToEnd,
  };
};
