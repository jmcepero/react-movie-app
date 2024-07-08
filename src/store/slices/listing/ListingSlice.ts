import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie} from '../../../domain/movie/entities/Movies';
import {SearchesResult} from '../../../presentation/hooks/base/MovieResult';
import {getPopularUseCase} from '../../../domain/movie/usecases/GetPopularUseCase';
import {getTopRatedUseCase} from '../../../domain/movie/usecases/GeTopRatedUseCase';

export interface MovieCategory {
  category: 'popular' | 'topRated';
  page: number;
}

const initialListingState: SearchesResult = {
  isLoading: false,
  pageLoading: false,
  result: [],
  page: 1,
  error: '',
};

const loadMovies = async (params: MovieCategory) => {
  const useCase =
    params.category === 'popular' ? getPopularUseCase : getTopRatedUseCase;

  return await useCase.execute(params.page);
};

export const loadMoviesAsync = createAsyncThunk(
  'listing/loadMovies',
  loadMovies,
);

export const nextPageAsync = createAsyncThunk('listing/nextPage', loadMovies);

export const listingSlice = createSlice({
  name: 'listing',
  initialState: initialListingState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadMoviesAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadMoviesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.page = 2;
        state.result = action.payload.results;
      })
      .addCase(loadMoviesAsync.rejected, (state, action) => {
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
      });
  },
});
