import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import di from "../../../di";
import { MovieResult } from "../base/MovieResult";

export interface MovieCategory {
    category: 'popular' | 'topRated';
    page: number;
}

const initialListingState: MovieResult = {
    isLoading: false,
    pageLoading: false,
    result: [],
    page: 1,
    error: ''
}

const loadMovies = async (params: MovieCategory) => {
    const useCase = params.category === 'popular'
        ? di.GetPopularUseCase
        : di.GetTopRatedUseCase

    return await useCase.execute(params.page)
}

export const loadMoviesAsync = createAsyncThunk(
    'listing/loadMovies',
    loadMovies
);

export const nextPageAsync = createAsyncThunk(
    'listing/nextPage',
    loadMovies
);

export const listingSlice = createSlice({
    name: 'listing',
    initialState: initialListingState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMoviesAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadMoviesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = 2
                state.result = action.payload.results
            })
            .addCase(loadMoviesAsync.rejected, (state, action) => {
                console.log(action.error.message)
                state.isLoading = false;
                state.error = action.error.message || 'Unknow error'
            })
            .addCase(nextPageAsync.pending, (state) => {
                state.pageLoading = true;
            })
            .addCase(nextPageAsync.fulfilled, (state, action) => {
                state.pageLoading = false;
                state.page += 1
                state.result = [...state.result, ...action.payload.results]
            })
            .addCase(nextPageAsync.rejected, (state, action) => {
                state.pageLoading = false;
                state.error = action.error.message || 'Unknow error'
            })
    }
});