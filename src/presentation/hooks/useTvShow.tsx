import {useEffect, useState} from 'react';
import {TVShow} from '../../domain/tv_shows/entities/TVShows';
import {getOnTheAirUseCase} from '../../domain/tv_shows/usecases/GetOnTheAirUseCase';
import {getTVShowsPouplarUseCase} from '../../domain/tv_shows/usecases/GetTVShowsPouplarUseCase';
import {getTVShowsTopRatedUseCase} from '../../domain/tv_shows/usecases/GetTVShowsTopRatedUseCase';
import {errorHandler} from '../base/errorHandler';

interface TVShowsState {
  isLoading: boolean;
  onTheAir: TVShow[];
  popular: TVShow[];
  topRated: TVShow[];
  error: string;
}

const initialTVShowsState: TVShowsState = {
  isLoading: false,
  onTheAir: [],
  popular: [],
  topRated: [],
  error: '',
};

export const useTvShow = () => {
  const [tvShowState, setTvShowState] = useState(initialTVShowsState);

  useEffect(() => {
    loadTvShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllTvShows = async () => {
    return Promise.all([
      getOnTheAirUseCase.execute(),
      getTVShowsPouplarUseCase.execute(),
      getTVShowsTopRatedUseCase.execute(),
    ]);
  };

  const loadTvShows = async () => {
    setTvShowState({
      ...tvShowState,
      isLoading: true,
    });
    try {
      const result = await getAllTvShows();
      setTvShowState({
        isLoading: false,
        onTheAir: result[0].results,
        popular: result[1].results,
        topRated: result[2].results.slice(0, 8),
        error: '',
      });
    } catch (error) {
      const {message} = errorHandler(error);
      setTvShowState({
        ...tvShowState,
        isLoading: false,
        error: message,
      });
    }
  };

  return {
    ...tvShowState,
    loadTvShows,
  };
};
