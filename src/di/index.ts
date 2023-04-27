import MovieModule from "../data/movie/di/MovieModule";
import UseCasesModule from "../domain/movie/di/UseCasesModule";

const movieModule = MovieModule()
const useCases = UseCasesModule(movieModule.MovieRepository)

export default {
    FindMoviesUseCase: useCases.findMoviesUseCase,
    GetNowPlayingUseCase: useCases.getNowPlayingUseCase,
    GetPopularUseCase: useCases.getPopularUseCase,
    GetTopRatedUseCase: useCases.getTopRatedUseCase
};