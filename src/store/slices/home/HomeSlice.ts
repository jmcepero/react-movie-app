import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import di from "../../../di";
import { Movie } from "../../../domain/movie/entities/Movies";
import { CustomGenre, genres } from '../../../data/genre/local/CustomGenres';

interface HomeMovies {
    isLoading: boolean;
    nowPlaying: Movie[];
    popular: Movie[];
    genres: CustomGenre[];
    topRated: Movie[];
    error: string;
}

const initialHomeMoviesState: HomeMovies = {
    isLoading: false,
    nowPlaying: [],
    popular: [],
    genres: [],
    topRated: [],
    error: ''
}

const loadHomeMovies = async () => {
    const nowPlayingUseCase = di.GetNowPlayingUseCase
    const getPopularUseCase = di.GetPopularUseCase
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
                state.isLoading = false;
                state.nowPlaying = action.payload[0].results.slice(0, 5)
                state.popular = action.payload[1].results
                state.topRated = action.payload[2].results
                state.genres = genres
            })
            .addCase(loadHomeMoviesAsync.rejected, (state, action) => {
                console.log(action.error.message)
                state.isLoading = false;
                state.error = action.error.message || 'Unknow error'
            })
    }
});