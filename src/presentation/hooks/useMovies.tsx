import {useEffect, useState} from 'react';
import {genres, CustomGenre} from '../../data/genre/local/CustomGenres';
import {Movie} from '../../domain/movie/entities/Movies';
import {errorHandler} from '../base/errorHandler';
import {getNowPlayingUseCase} from '../../domain/movie/usecases/GetNowPlayingUseCase';
import {getTopRatedUseCase} from '../../domain/movie/usecases/GeTopRatedUseCase';
import {getPopularUseCase} from '../../domain/movie/usecases/GetPopularUseCase';

interface HomeMoviesState {
  isLoading: boolean;
  nowPlaying: Movie[];
  popular: Movie[];
  genres: CustomGenre[];
  topRated: Movie[];
  error: string;
}

const initialHomeMoviesState: HomeMoviesState = {
  isLoading: true,
  nowPlaying: [],
  popular: [],
  genres: [],
  topRated: [],
  error: '',
};

export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<HomeMoviesState>(
    initialHomeMoviesState,
  );

  useEffect(() => {
    getMoviesNowPlaying();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoviesNowPlaying = async () => {
    const nowPlayingProm = getNowPlayingUseCase.execute();
    const popularProm = getPopularUseCase.execute();
    const topRatedProm = getTopRatedUseCase.execute();

    setMoviesState({
      ...moviesState,
      isLoading: true,
    });

    try {
      const [nowPlayingRes, popularRes, topRatedRes] = await Promise.all([
        nowPlayingProm,
        popularProm,
        topRatedProm,
      ]);

      setMoviesState({
        nowPlaying: nowPlayingRes.results.slice(0, 8),
        popular: popularRes.results,
        genres: genres,
        topRated: topRatedRes.results,
        isLoading: false,
        error: '',
      });
    } catch (error) {
      const {message} = errorHandler(error);
      setMoviesState({
        ...moviesState,
        isLoading: false,
        error: message,
      });
    }
  };

  return {
    ...moviesState,
    reloadData: getMoviesNowPlaying,
  };
};
