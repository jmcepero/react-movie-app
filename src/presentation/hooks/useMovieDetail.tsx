import {useEffect, useState} from 'react';
import {Movie} from '../../domain/movie/entities/Movies';
import {getMovieDetailUseCase} from '../../domain/movie/usecases/GetMovieDetailUseCase';
import {errorHandler} from '../base/errorHandler';

interface MovieDetailState {
  isLoading: boolean;
  detail: Movie | undefined;
  image: string | undefined;
  error: string;
}

const initialMovieDetailState: MovieDetailState = {
  isLoading: false,
  detail: undefined,
  error: '',
  image: undefined,
};

export const useMovieDetail = (movieId: string) => {
  const [movieDetailState, setMovieDetailState] = useState<MovieDetailState>(
    initialMovieDetailState,
  );

  useEffect(() => {
    getMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovieDetail = async () => {
    setMovieDetailState({
      ...movieDetailState,
      isLoading: true,
    });

    try {
      const movieDetail = await getMovieDetailUseCase.execute(movieId);
      setMovieDetailState({
        isLoading: false,
        detail: movieDetail,
        error: '',
        image:
          movieDetail?.posterPath &&
          `https://image.tmdb.org/t/p/original${movieDetail.posterPath}`,
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      setMovieDetailState({
        ...movieDetailState,
        isLoading: false,
        error: errorMessage.message,
      });
    }
  };

  return {
    ...movieDetailState,
  };
};
