import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import di from '../../../di';
import {WatchProvider} from '../../../domain/watch_providers/entities/WatchProviders';

interface WatchProviderState {
  isLoading: boolean;
  watchProvider: WatchProvider[];
  error: string;
}

interface WatchProviderParams {
  itemId: string;
  itemType: string;
}

const initialWatchProviderState: WatchProviderState = {
  isLoading: false,
  watchProvider: [],
  error: '',
};

const loadWatchProviders = async ({itemId, itemType}: WatchProviderParams) => {
  const getWatchProvidersUseCase = di.GetWatchProviderUseCase;

  return await getWatchProvidersUseCase.execute(itemId, itemType);
};

export const loadWatchProvidersAsync = createAsyncThunk(
  'watchProvider/loadWatchProviders',
  loadWatchProviders,
);

export const watchProviderSlice = createSlice({
  name: 'watchProvider',
  initialState: initialWatchProviderState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadWatchProvidersAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadWatchProvidersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchProvider = action.payload;
      })
      .addCase(loadWatchProvidersAsync.rejected, (state, action) => {
        console.log(action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'Unknow error';
      });
  },
});
