// stores/GenresStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomGenre} from '../../../../data/genre';
import {getMovieGenresUseCase} from '../../../../domain/genre/usecases/GetMovieGenresUseCase';
import {getTvShowGenresUseCase} from '../../../../domain/genre/usecases/GetTvShowGenresUseCase';
import {errorHandler} from '../../../base/errorHandler';
import {saveUserPreferenceUseCase} from '../../../../domain/preferences/usecases/SaveUserPreferenceUseCase';

class GenreStore {
  isLoading: boolean | undefined = undefined;
  saveLoading: boolean | undefined = undefined;
  tvShowGnres: CustomGenre[] = [];
  movieGnres: CustomGenre[] = [];
  selectedMovieGenres: CustomGenre[] = [];
  selectedTVShowGenres: CustomGenre[] = [];
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded() {
    this.loadGenres();
  }

  get canContinue() {
    return (
      this.selectedMovieGenres.length > 0 &&
      this.selectedTVShowGenres.length > 0
    );
  }

  async loadGenres() {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const [movieGenres, tvShowGenres] = await Promise.all([
        getMovieGenresUseCase.execute(),
        getTvShowGenresUseCase.execute(),
      ]);
      runInAction(() => {
        this.movieGnres = movieGenres;
        this.tvShowGnres = tvShowGenres;
      });
    } catch (error) {
      const {message} = errorHandler(error);
      this.error = message;
      console.log(message);
    } finally {
      await this.delay(2000);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  toggleMovieGenre(genre: number) {
    const index = this.movieGnres.findIndex(g => g.id === genre);
    const indexSelected = this.selectedMovieGenres.findIndex(
      g => g.id === genre,
    );
    if (indexSelected >= 0) {
      this.selectedMovieGenres.splice(indexSelected, 1);
    } else {
      this.selectedMovieGenres.push(this.movieGnres[index]);
    }
  }

  toggleTVShowGenre(genre: number) {
    const index = this.tvShowGnres.findIndex(g => g.id === genre);
    const indexSelected = this.selectedTVShowGenres.findIndex(
      g => g.id === genre,
    );
    if (indexSelected >= 0) {
      this.selectedTVShowGenres.splice(indexSelected, 1);
    } else {
      this.selectedTVShowGenres.push(this.tvShowGnres[index]);
    }
  }

  async onContinueButtonClicked(
    userId: string | null | undefined,
    onFinish: Function,
  ) {
    if (userId) {
      runInAction(() => {
        this.saveLoading = true;
      });
      try {
        await saveUserPreferenceUseCase.execute(
          userId,
          this.selectedMovieGenres,
          this.selectedTVShowGenres,
        );
      } catch (error) {
        console.log(error);
      } finally {
        console.log('LLEGO al final');
        runInAction(() => {
          this.saveLoading = false;
        });
        onFinish();
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default GenreStore;
