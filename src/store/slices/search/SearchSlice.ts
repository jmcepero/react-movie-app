import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import di from '../../../di';
import {MovieResult} from '../../../presentation/hooks/base/MovieResult';
import {Movie} from '../../../domain/movie/entities/Movies';
import {TVShow} from '../../../domain/tv_shows/entities/TVShows';

export interface SearchParams {
  term: string;
  page: number;
}

const initialSearchState: MovieResult = {
  isLoading: false,
  pageLoading: false,
  result: [],
  page: 1,
  error: '',
};

const findMovies = async (params: SearchParams) => {
  const useCase = di.FindMoviesUseCase;
  return await useCase.execute(params.term, params.page);
};

const findTVShows = async (params: SearchParams) => {
  const useCase = di.FindTVShowUseCase;
  return await useCase.execute(params.term, params.page);
};

export const findMoviesAsync = createAsyncThunk('search/findMovie', findMovies);

export const findTVShowsAsync = createAsyncThunk(
  'search/findTVShows',
  findTVShows,
);

export const nextPageAsync = createAsyncThunk('search/nextPage', findMovies);

export const nextPageTVShowAsync = createAsyncThunk(
  'search/nextPageTvShow',
  findTVShows,
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    restoreToDefault: state => {
      state = initialSearchState;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(findMoviesAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(findMoviesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.page = 1;
        state.result = action.payload.results;
      })
      .addCase(findMoviesAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'Unknow error';
      })
      .addCase(nextPageAsync.pending, state => {
        state.pageLoading = true;
      })
      .addCase(nextPageAsync.fulfilled, (state, action) => {
        state.pageLoading = false;
        state.page += 1;
        state.result = [
          ...(state.result as Movie[]),
          ...(action.payload.results as Movie[]),
        ];
      })
      .addCase(nextPageAsync.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.error.message || 'Unknow error';
      })
      .addCase(findTVShowsAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(findTVShowsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.page = 1;
        state.result = action.payload.results;
      })
      .addCase(findTVShowsAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'Unknow error';
      })
      .addCase(nextPageTVShowAsync.pending, state => {
        state.pageLoading = true;
      })
      .addCase(nextPageTVShowAsync.fulfilled, (state, action) => {
        state.pageLoading = false;
        state.page += 1;
        state.result = [
          ...(state.result as TVShow[]),
          ...(action.payload.results as TVShow[]),
        ];
      })
      .addCase(nextPageTVShowAsync.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.error.message || 'Unknow error';
      });
  },
});

export const {restoreToDefault} = searchSlice.actions;
