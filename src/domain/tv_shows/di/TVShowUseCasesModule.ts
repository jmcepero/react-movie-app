import { TVShowDataSource } from '../../../data/tv_shows/TVShowRepository';
import GetOnTheAirUseCase from '../usecases/GetOnTheAirUseCase';
import GetTVShowsPouplarUseCase from '../usecases/GetTVShowsPouplarUseCase';
import GetTVShowsTopRatedUseCase from '../usecases/GetTVShowsTopRatedUseCase';
import GetTVShowDetailUseCase from '../usecases/GetTVShowDetailUseCase';
import FindTVShowUseCase from '../usecases/FindTVShowUseCase';

export default (tvShowRepository: TVShowDataSource) => {
    return {
        getOnTheAirUseCase: new GetOnTheAirUseCase(tvShowRepository),
        getTVShowsPopularUseCase: new GetTVShowsPouplarUseCase(tvShowRepository),
        getTVShowsTopRatedUseCase: new GetTVShowsTopRatedUseCase(tvShowRepository),
        getTVShowDetailUseCase: new GetTVShowDetailUseCase(tvShowRepository),
        findTVShowUseCase: new FindTVShowUseCase(tvShowRepository),
    }
}