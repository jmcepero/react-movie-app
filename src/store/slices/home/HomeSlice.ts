import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import di from "../../../di";
import { Movie } from "../../../domain/movie/entities/Movies";
import { CustomGenre, genres } from '../../../data/genre/local/CustomGenres';
import { getPopularUseCase } from "../../../domain/movie/usecases/GetPopularUseCase";

interface HomeMoviesState {
    isLoading: boolean;
    nowPlaying: Movie[];
    popular: Movie[];
    genres: CustomGenre[];
    topRated: Movie[];
    error: string;
}

const initialHomeMoviesState: HomeMoviesState = {
    isLoading: true,
    nowPlaying: [],
    popular: [],
    genres: [],
    topRated: [],
    error: ''
}

const loadHomeMovies = async () => {
    const nowPlayingUseCase = di.GetNowPlayingUseCase
    const getTopRatedUseCase = di.GetTopRatedUseCase

    return await Promise.all([nowPlayingUseCase.execute(), getPopularUseCase.execute(), getTopRatedUseCase.execute()])
}

export const loadHomeMoviesAsync = createAsyncThunk(
    'home/loadHomeMovies',
    loadHomeMovies
);

export const homeSlice = createSlice({
    name: 'home',
    initialState: initialHomeMoviesState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadHomeMoviesAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadHomeMoviesAsync.fulfilled, (state, action) => {
               state = {
                ...state,
                nowPlaying: action.payload[0].results.slice(0, 8),
                popular: action.payload[1].results,
                topRated:  action.payload[2].results,
                genres: genres,
                isLoading: false,
               }
               return state
            })
            .addCase(loadHomeMoviesAsync.rejected, (state, action) => {
                console.log(action.error.message)
                state.isLoading = false;
                state.error = action.error.message || 'Unknow error'
            })
    }
});