import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import di from "../../../di";
import { MovieResult } from "../base/MovieResult";

export interface SearchParams {
    term: string;
    page: number
}

const initialSearchState: MovieResult = {
    isLoading: false,
    pageLoading: false,
    result: [],
    page: 1,
    error: ''
}

const findMovies = async (params: SearchParams) => {
    const useCase = di.FindMoviesUseCase
    return await useCase.execute(params.term, params.page)
}

export const findMoviesAsync = createAsyncThunk(
    'search/findMovie',
    findMovies
);

export const nextPageAsync = createAsyncThunk(
    'search/nextPage',
    findMovies
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearchState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findMoviesAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findMoviesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = 1
                state.result = action.payload.results
            })
            .addCase(findMoviesAsync.rejected, (state, action) => {
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