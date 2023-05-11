import { configureStore } from '@reduxjs/toolkit'
import { homeSlice } from './slices/home/HomeSlice';
import { listingSlice } from './slices/listing/ListingSlice';
import { searchSlice } from './slices/search/SearchSlice'
import { tvShowDetailSlice } from './slices/tv_shows/TVShowDetailSlice';
import { tvShowSlice } from './slices/tv_shows/TVShowSlice';
import { watchProviderSlice } from './slices/watch_provider/WatchProviderSlice';
import { movieDetailSlice } from './slices/home/MovieDetailSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    listing: listingSlice.reducer,
    home: homeSlice.reducer,
    tvShow: tvShowSlice.reducer,
    watchProvider: watchProviderSlice.reducer,
    tvShowDetail: tvShowDetailSlice.reducer,
    movieDetail: movieDetailSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch