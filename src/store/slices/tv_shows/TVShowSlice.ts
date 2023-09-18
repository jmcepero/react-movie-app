import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import di from '../../../di';
import {TVShow} from '../../../domain/tv_shows/entities/TVShows';

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

const loadTVShows = async () => {
  const onTheAirUseCase = di.GetOnTheAirUseCase;
  const popularUseCase = di.GetTVShowsPouplarUseCase;
  const topRatedUseCase = di.GetTVShowsTopRatedUseCase;

  return await Promise.all([
    onTheAirUseCase.execute(),
    popularUseCase.execute(),
    topRatedUseCase.execute(),
  ]);
};

export const loadTVShowsAsync = createAsyncThunk(
  'tvShow/loadTVShows',
  loadTVShows,
);

export const tvShowSlice = createSlice({
  name: 'tvShow',
  initialState: initialTVShowsState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTVShowsAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadTVShowsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.onTheAir = action.payload[0].results;
        state.popular = action.payload[1].results;
        state.topRated = action.payload[2].results.slice(0, 8);
      })
      .addCase(loadTVShowsAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'Unknow error';
      });
  },
});
