// searchStore.ts
// searchStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import {errorHandler} from '../../../base/errorHandler';
import {Cast, PeopleDetail} from '../../../../domain/people/entities/People';
import {getPeopleDetailUseCase} from '../../../../domain/people/usecases/GetPeopleDetailUseCase';

class PersonStore {
  isLoading: boolean = false;
  person: PeopleDetail | undefined;
  error: string = '';
  movieImages: string[] = [];
  tvImages: string[] = [];

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

      this.movieImages = getCarouselImages(
        this.person.known_for_department === 'Acting'
          ? this.person.movie_credits.cast
          : this.person.movie_credits.crew,
      );

      this.tvImages = getCarouselImages(
        this.person.known_for_department === 'Acting'
          ? this.person.tv_credits.cast
          : this.person.tv_credits.crew,
      );

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

function getCarouselImages(list: Cast[]): string[] {
  return list
    .filter(cast => cast.poster_path != null)
    .map(cast => cast.poster_path)
    .map(poster => `https://image.tmdb.org/t/p/original${poster}`)
    .slice(0, 10);
}

export default PersonStore;
