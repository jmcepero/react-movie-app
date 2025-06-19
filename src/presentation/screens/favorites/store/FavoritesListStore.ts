import { makeAutoObservable, runInAction } from 'mobx';
import { Movie } from '@domain/movie/entities/Movies';
import { TVShow } from '@domain/tv_shows/entities/TVShows';
import { getFavoriteMoviesUseCase } from '@domain/favorites/GetFavoriteMoviesUseCase';
import { getFavoriteTvShowsUseCase } from '@domain/favorites/GetFavoriteTvShowsUseCase';

class FavoritesListStore {
  movies = {
    result: [] as Movie[],
    page: 1,
    isLoading: false,
    isPageLoading: false,
    hasMoreMovies: true,
  };

  tvShows = {
    result: [] as TVShow[],
    page: 1,
    isLoading: false,
    isPageLoading: false,
    hasMoreTvShows: true,
  };

  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hasError() {
    return !!this.error && this.error.length > 0;
  }

  async fetchFavoriteMovies(accountId: string, sessionId: string) {
    if (this.movies.isLoading || !this.movies.hasMoreMovies) return;

    this._setLoading('movies', true);
    try {
      const response = await getFavoriteMoviesUseCase.execute(
        accountId,
        sessionId,
        this.movies.page,
      );
      runInAction(() => {
        this.movies.result =
          this.movies.page === 1
            ? response.results
            : [...this.movies.result, ...response.results];
        this.movies.hasMoreMovies = response.page < response.totalPages;
        if (this.movies.hasMoreMovies) {
          this.movies.page++;
        }
        this.error = null;
      });
    } catch (e) {
      runInAction(() => {
        this.error = 'Failed to load favorite movies.';
      });
    } finally {
      this._setLoading('movies', false);
    }
  }

  async fetchFavoriteTvShows(accountId: string, sessionId: string) {
    if (this.tvShows.isLoading || !this.tvShows.hasMoreTvShows) return;

    this._setLoading('tvShows', true);
    try {
      const response = await getFavoriteTvShowsUseCase.execute(
        accountId,
        sessionId,
        this.tvShows.page,
      );
      runInAction(() => {
        this.tvShows.result =
          this.tvShows.page === 1
            ? response.results
            : [...this.tvShows.result, ...response.results];
        this.tvShows.hasMoreTvShows = response.page < response.totalPages;
        if (this.tvShows.hasMoreTvShows) {
          this.tvShows.page++;
        }
        this.error = null;
      });
    } catch (e) {
      runInAction(() => {
        this.error = 'Failed to load favorite TV shows.';
      });
    } finally {
      this._setLoading('tvShows', false);
      console.log(this.tvShows);
    }
  }

  private _setLoading(type: 'movies' | 'tvShows', value: boolean) {
    if (type === 'movies') {
      this.movies.page <= 2
        ? (this.movies.isLoading = value)
        : (this.movies.isPageLoading = value);
    }
    if (type === 'tvShows') {
      this.tvShows.page <= 2
        ? (this.tvShows.isLoading = value)
        : (this.tvShows.isPageLoading = value);
    }
  }

  cleanup() {
    // Reset movies state
    this.movies.result = [];
    this.movies.page = 1;
    this.movies.isLoading = false;
    this.movies.isPageLoading = false;
    this.movies.hasMoreMovies = true;

    // Reset tvShows state
    this.tvShows.result = [];
    this.tvShows.page = 1;
    this.tvShows.isLoading = false;
    this.tvShows.isPageLoading = false;
    this.tvShows.hasMoreTvShows = true;

    // Reset error state
    this.error = null;
  }
}

export default FavoritesListStore;
