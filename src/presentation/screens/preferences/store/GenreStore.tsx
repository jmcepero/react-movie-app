// stores/GenresStore.ts
import {makeAutoObservable, runInAction} from 'mobx';
import {CustomGenre} from '../../../../data/genre';
import {getMovieGenresUseCase} from '../../../../domain/genre/usecases/GetMovieGenresUseCase';
import {getTvShowGenresUseCase} from '../../../../domain/genre/usecases/GetTvShowGenresUseCase';
import {errorHandler} from '../../../base/errorHandler';
import {saveUserPreferenceUseCase} from '../../../../domain/preferences/usecases/SaveUserPreferenceUseCase';

class GenreStore {
  isLoading: boolean | undefined = undefined;
  saveLoading: boolean | undefined = undefined;
  tvShowGenres: CustomGenre[] = [];
  movieGenres: CustomGenre[] = [];
  selectedMovieGenres: CustomGenre[] = [];
  selectedTVShowGenres: CustomGenre[] = [];
  error: string | null = null;
  goToHome: boolean | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded() {
    this._loadGenres();
  }

  get canContinue() {
    return (
      this.selectedMovieGenres.length > 0 &&
      this.selectedTVShowGenres.length > 0
    );
  }

  get hasError() {
    return this.error && this.error.length > 0;
  }

  toggleMovieGenre(genreId: number) {
    this.selectedMovieGenres = this._toggleGenre(
      genreId,
      this.movieGenres,
      this.selectedMovieGenres,
    );
  }

  toggleTVShowGenre(genreId: number) {
    this.selectedTVShowGenres = this._toggleGenre(
      genreId,
      this.tvShowGenres,
      this.selectedTVShowGenres,
    );
  }

  onErrorHide() {
    this.error = null;
  }

  async onContinueButtonClicked(
    userId: string | null | undefined,
    onFinish: (success: boolean) => void,
  ) {
    if (!userId) {
      return;
    }

    if (!this.canContinue) {
      return;
    }

    runInAction(() => {
      this.saveLoading = true;
      this.error = null;
    });
    try {
      await saveUserPreferenceUseCase.execute(
        userId,
        this.selectedMovieGenres,
        this.selectedTVShowGenres,
      );
      onFinish(true);
    } catch (error) {
      const {message} = errorHandler(error);
      this._setError(message);
      onFinish(false);
    } finally {
      runInAction(() => {
        this.saveLoading = false;
      });
    }
  }

  private async _loadGenres() {
    runInAction(() => {
      this.error = null;
      this.isLoading = true;
    });
    try {
      const [movieGenres, tvShowGenres] = await Promise.all([
        getMovieGenresUseCase.execute(),
        getTvShowGenresUseCase.execute(),
      ]);
      runInAction(() => {
        this.movieGenres = movieGenres;
        this.tvShowGenres = tvShowGenres;
      });
    } catch (error) {
      const {message} = errorHandler(error);
      this.error = message;
      console.log(message);
    } finally {
      await this._delay(2000);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  private _toggleGenre(
    genreId: number,
    allGenres: CustomGenre[],
    selectedGenres: CustomGenre[],
  ): CustomGenre[] {
    const genreToAddOrRemove = allGenres.find(item => item.id === genreId);
    if (!genreToAddOrRemove) return selectedGenres;

    const indexInSelected = selectedGenres.findIndex(
      item => item.id === genreId,
    );

    if (indexInSelected >= 0) {
      return selectedGenres.filter(g => g.id !== genreId);
    } else {
      return [...selectedGenres, genreToAddOrRemove];
    }
  }

  private _setError(value: string | null) {
    this.error = value;
  }

  private _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default GenreStore;
