import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Movie} from '../../../../domain/movie/entities/Movies';
import {errorHandler} from '../../../base/errorHandler';
import {discoverMoviesByGenresUseCase} from '../../../../domain/movie/usecases/DiscoverMoviesByGenresUseCase';
import {FilterChipsStore} from './FilterChipsStore';
import {MovieFilterRequest} from '../../../../domain/movie/entities/MovieFilterRequest';
import {MapHelper} from '../utils/Maps';

class MovieFilterStore {
  ui = {
    isLoading: false,
    pageLoading: false,
    error: '',
    isFilterActive: false,
  };

  data = {
    movies: [] as Movie[],
    page: 1,
  };

  constructor(private filterStore: FilterChipsStore) {
    makeAutoObservable(this);
  }

  get filterChipLoading() {
    return this.filterStore.isLoading;
  }

  get hasError() {
    return this.ui.error !== '';
  }

  onScreenLoaded() {
    this.filterStore.onScreenLoaded();
    this.loadFilteredMovies(1);
  }

  async loadFilteredMovies(page: number, params?: Map<string, string>) {
    this.setLoadingState(true, page);

    try {
      const data = await discoverMoviesByGenresUseCase.execute(params, page);
      runInAction(() => {
        this.data.movies =
          page === 1 ? data.results : [...this.data.movies, ...data.results];
        this.resetError();
      });
    } catch (error) {
      const {message} = errorHandler(error);
      runInAction(() => {
        this.ui.error = message;
      });
    } finally {
      this.setLoadingState(false, page);
    }
  }

  onReachToEnd() {
    runInAction(() => {
      this.data.page += 1;
    });
    this.loadFilteredMovies(this.data.page);
  }

  onFilterPanelDismiss() {
    if (this.filterStore.haveSavedSections) {
      this.filterStore.restoreSelectionState();
    } else {
      this.filterStore.resetSelection();
    }
  }

  onButtonApplyClicked() {
    const filterParams = this.filterStore.selectedChipsMap;
    const hasFilters = filterParams && filterParams.size > 0;

    runInAction(() => {
      this.ui.isFilterActive = !!hasFilters;
    });

    if (hasFilters) {
      this.filterStore.saveSelectionState();
    } else {
      this.filterStore.resetAllStates();
    }

    this.loadFilteredMovies(1, hasFilters ? filterParams : undefined);
  }

  onResetFilterClicked() {
    runInAction(() => {
      this.data.page = 1;
      this.ui.isFilterActive = false;
      this.filterStore.resetAllStates();
    });
    this.loadFilteredMovies(1);
  }

  resetAllStates() {
    runInAction(() => {
      this.ui.isLoading = false;
      this.ui.pageLoading = false;
      this.data.movies = [];
      this.ui.error = '';
      this.data.page = 1;
      this.ui.isFilterActive = false;
    });
    this.filterStore.resetAllStates();
  }

  private setLoadingState(isLoading: boolean, page: number) {
    runInAction(() => {
      this.ui.isLoading = page === 1 ? isLoading : this.ui.isLoading;
      this.ui.pageLoading = page > 1 ? isLoading : this.ui.pageLoading;
    });
  }

  private resetError() {
    runInAction(() => {
      this.ui.error = '';
    });
  }
}

export default MovieFilterStore;
