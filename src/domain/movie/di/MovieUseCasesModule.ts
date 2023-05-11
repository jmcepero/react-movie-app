import { MovieDataSource } from '../../../data/movie/MovieRepository';
import FindMoviesUseCase from '../usecases/FindMoviesUseCase';
import GetMovieDetailUseCase from '../usecases/GetMovieDetailUseCase';
import GetNowPlayingUseCase from '../usecases/GetNowPlayingUseCase';
import GetTopRatedUseCase from '../usecases/GeTopRatedUseCase';
import GetPopularUseCase from '../usecases/GetPopularUseCase';

export default (movieRepository: MovieDataSource) => {
    return {
        findMoviesUseCase: new FindMoviesUseCase(movieRepository),
        getPopularUseCase: new GetPopularUseCase(movieRepository),
        getTopRatedUseCase: new GetTopRatedUseCase(movieRepository),
        getNowPlayingUseCase: new GetNowPlayingUseCase(movieRepository),
        getMovieDetailUseCase: new GetMovieDetailUseCase(movieRepository),
    }
}