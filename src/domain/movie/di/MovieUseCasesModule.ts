import { MovieDataSource } from '../../../data/movie/MovieRepository';
import FindMoviesUseCase from '../usecases/FindMoviesUseCase';
import GetPopularUseCase from '../usecases/GetPopularUseCase';
import GetTopRatedUseCase from '../usecases/GeTopRatedUseCase';
import GetNowPlayingUseCase from '../usecases/GetNowPlayingUseCase';
import GetMovieDetailUseCase from '../usecases/GetMovieDetailUseCase';

export default (movieRepository: MovieDataSource) => {
    return {
        findMoviesUseCase: new FindMoviesUseCase(movieRepository),
        getPopularUseCase: new GetPopularUseCase(movieRepository),
        getTopRatedUseCase: new GetTopRatedUseCase(movieRepository),
        getNowPlayingUseCase: new GetNowPlayingUseCase(movieRepository),
        getMovieDetailUseCase: new GetMovieDetailUseCase(movieRepository),
    }
}