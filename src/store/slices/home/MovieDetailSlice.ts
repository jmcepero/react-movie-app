import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import di from "../../../di";
import { Movie } from '../../../domain/movie/entities/Movies';

interface MovieDetailState {
    isLoading: boolean;
    detail: Movie | undefined;
    error: string;
}

const initialMovieDetailState: MovieDetailState = {
    isLoading: false,
    detail: undefined,
    error: ''
}

const loadMovieDetail = async (movieId: string) => {
    const movieDetailUseCase = di.GetMovieDetailUseCase

    return await movieDetailUseCase.execute(movieId)
}

export const loadMovieDetailAsync = createAsyncThunk(
    'movieDetail/loadMovieDetail',
    loadMovieDetail
);

export const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState: initialMovieDetailState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMovieDetailAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadMovieDetailAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detail = action.payload
            })
            .addCase(loadMovieDetailAsync.rejected, (state, action) => {
                console.log(action.error.message)
                state.isLoading = false;
                state.error = action.error.message || 'Unknow error'
            })
    }
});

