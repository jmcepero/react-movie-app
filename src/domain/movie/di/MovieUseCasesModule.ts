import { MovieDataSource } from '../../../data/movie/MovieRepository';
import FindMoviesUseCase from '../usecases/FindMoviesUseCase';
import GetMovieDetailUseCase from '../usecases/GetMovieDetailUseCase';
import GetNowPlayingUseCase from '../usecases/GetNowPlayingUseCase';
import GetTopRatedUseCase from '../usecases/GeTopRatedUseCase';

export default (movieRepository: MovieDataSource) => {
    return {
        findMoviesUseCase: new FindMoviesUseCase(movieRepository),
        getTopRatedUseCase: new GetTopRatedUseCase(movieRepository),
        getNowPlayingUseCase: new GetNowPlayingUseCase(movieRepository),
        getMovieDetailUseCase: new GetMovieDetailUseCase(movieRepository),
    }
}