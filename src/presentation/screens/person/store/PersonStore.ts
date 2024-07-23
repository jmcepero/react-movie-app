// searchStore.ts
// searchStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import {errorHandler} from '../../../base/errorHandler';
import {PeopleDetail} from '../../../../domain/people/entities/People';
import {getPeopleDetailUseCase} from '../../../../domain/people/usecases/GetPeopleDetailUseCase';

class PersonStore {
  isLoading: boolean = false;
  person: PeopleDetail | undefined;
  error: string = '';
  images: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded(value: string) {
    this.searchPersonDetail(value);
  }

  async searchPersonDetail(value: string) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      this.person = await getPeopleDetailUseCase.execute(value);
      this.images = this.person.movie_credits.cast
        .filter(cast => cast.poster_path != null)
        .map(cast => cast.poster_path)
        .map(poster => `https://image.tmdb.org/t/p/original${poster}`)
        .slice(0, 10);
      this.error = '';
    } catch (error) {
      const {message} = errorHandler(error);
      this.error = message;
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default PersonStore;
