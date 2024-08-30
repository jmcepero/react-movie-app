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
  portraitImage: string = '';

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

      this.portraitImage = getCarouselImages(
        this.person.known_for_department === 'Acting'
          ? this.person.movie_credits.cast
          : this.person.movie_credits.crew,
      );

      if (this.portraitImage == '') {
        this.portraitImage = getCarouselImages(
          this.person.known_for_department === 'Acting'
            ? this.person.tv_credits.cast
            : this.person.tv_credits.crew,
        );
      }

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

function getCarouselImages(list: Cast[]): string {
  console.log(
    '=====> ',
    list.map(cast => cast.vote_average),
  );
  return list.map(
    cast => `https://image.tmdb.org/t/p/original${cast.poster_path}`,
  )[0];
}

export default PersonStore;
