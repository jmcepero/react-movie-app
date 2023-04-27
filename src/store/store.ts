import { configureStore } from '@reduxjs/toolkit'
import { homeSlice } from './slices/home/HomeSlice';
import { listingSlice } from './slices/listing/ListingSlice';
import { searchSlice } from './slices/search/SearchSlice'

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    listing: listingSlice.reducer,
    home: homeSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch