import TVShowModule from "../data/tv_shows/di/TVShowModule";
import WatchProviderModule from "../data/watch_providers/di/WatchProviderModule";
import MovieUseCasesModule from "../domain/movie/di/MovieUseCasesModule";
import TVShowUseCasesModule from "../domain/tv_shows/di/TVShowUseCasesModule";
import WatchProvidersUseCasesModule from "../domain/watch_providers/di/WatchProvidersUseCasesModule";
import { movieRepository } from '../data/movie/MovieRepository';

const tvShowModule = TVShowModule();
const watchProviderModule = WatchProviderModule()

const movieUseCases = MovieUseCasesModule(movieRepository);
const tvShowUseCases = TVShowUseCasesModule(tvShowModule.TvShowRepository);
const watchProviderUseCases = WatchProvidersUseCasesModule(watchProviderModule.WatchProviderRepository)

export default {
    FindMoviesUseCase: movieUseCases.findMoviesUseCase,
    GetNowPlayingUseCase: movieUseCases.getNowPlayingUseCase,
    GetTopRatedUseCase: movieUseCases.getTopRatedUseCase,
    GetMovieDetailUseCase: movieUseCases.getMovieDetailUseCase,
    GetOnTheAirUseCase: tvShowUseCases.getOnTheAirUseCase,
    GetTVShowsPouplarUseCase: tvShowUseCases.getTVShowsPopularUseCase,
    GetTVShowsTopRatedUseCase: tvShowUseCases.getTVShowsTopRatedUseCase,
    GetWatchProviderUseCase: watchProviderUseCases.getWatchProviderByMovieId,
    GetTVShowDetailUseCase: tvShowUseCases.getTVShowDetailUseCase,
    FindTVShowUseCase: tvShowUseCases.findTVShowUseCase,
};