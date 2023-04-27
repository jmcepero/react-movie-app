import { IMovieRepository } from '../../../data/movie/MovieRepository';
import FindMoviesUseCase from '../usecases/FindMoviesUseCase';
import GetPopularUseCase from '../usecases/GetPopularUseCase';
import GetTopRatedUseCase from '../usecases/GeTopRatedUseCase';
import GetNowPlayingUseCase from '../usecases/GetNowPlayingUseCase';

export default (movieRepository: IMovieRepository) => {
    return {
        findMoviesUseCase: new FindMoviesUseCase(movieRepository),
        getPopularUseCase: new GetPopularUseCase(movieRepository),
        getTopRatedUseCase: new GetTopRatedUseCase(movieRepository),
        getNowPlayingUseCase: new GetNowPlayingUseCase(movieRepository)
    }
}