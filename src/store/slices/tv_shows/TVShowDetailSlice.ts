import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import di from '../../../di';
import {TVShow} from '../../../domain/tv_shows/entities/TVShows';

interface TVShowDetailState {
  isLoading: boolean;
  detail: TVShow | undefined;
  error: string;
}

const initialTVShowDetailState: TVShowDetailState = {
  isLoading: false,
  detail: undefined,
  error: '',
};

const loadTVShowDetail = async (tvShowId: string) => {
  const tvShowDetailUseCase = di.GetTVShowDetailUseCase;

  return await tvShowDetailUseCase.execute(tvShowId);
};

export const loadTVShowDetailAsync = createAsyncThunk(
  'tvShowDetail/loadTVShowDetail',
  loadTVShowDetail,
);

export const tvShowDetailSlice = createSlice({
  name: 'tvShowDetail',
  initialState: initialTVShowDetailState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTVShowDetailAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadTVShowDetailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detail = action.payload;
      })
      .addCase(loadTVShowDetailAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'Unknow error';
      });
  },
});
