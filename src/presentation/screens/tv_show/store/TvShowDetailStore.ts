// searchStore.ts
// searchStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import {errorHandler} from '../../../base/errorHandler';
import {TVShow} from '../../../../domain/tv_shows/entities/TVShows';
import {getTVShowDetailUseCase} from '../../../../domain/tv_shows/usecases/GetTVShowDetailUseCase';

class TvShowDetailStore {
  isLoading: boolean = false;
  tvShow: TVShow | undefined;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded(value: string) {
    this.searchTvShowDetail(value);
  }

  async searchTvShowDetail(value: string) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      this.tvShow = await getTVShowDetailUseCase.execute(value);
      this.error = '';
    } catch (error) {
      const {message} = errorHandler(error);
      this.error = message;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default TvShowDetailStore;
