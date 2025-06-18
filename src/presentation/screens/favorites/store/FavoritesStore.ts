import { makeAutoObservable, runInAction } from 'mobx';
import TMDBAccountStore from '../../preferences/store/TMDBAccountStore';
import { getFavoriteMoviesUseCase } from '@domain/favorites/GetFavoriteMoviesUseCase';
import { getFavoriteTvShowsUseCase } from '@domain/favorites/GetFavoriteTvShowsUseCase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllFavoriteMoviesUseCase } from '@domain/favorites/GetAllFavoriteMoviesUseCase';
import { getAllFavoriteTvShowsUseCase } from '@domain/favorites/GetAllFavoriteTvShowsUseCase';
import { markAsFavoriteUseCase } from '@domain/favorites/MarkAsFavoriteUseCase';

const PENDING_FAVORITES_KEY = 'pendingFavoritesSync';

interface FavoriteAction {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  favoriteState: boolean;
  timestamp: number;
  actionId: string;
}

export class FavoritesStore {
  favoriteMovieIds = new Set<number>();
  favoriteTvShowIds = new Set<number>();

  pendingActions: FavoriteAction[] = [];
  isSyncing = false;
  isLoadingInitialFavorites: boolean | undefined = undefined;

  constructor(private tmdbAccountStore: TMDBAccountStore) {
    makeAutoObservable(this);
    this.loadPendingActions();
  }

  toggleFavorite(mediaId: number, mediaType: 'movie' | 'tv') {
    const isCurrentlyFavorite = this.isFavorite(mediaId, mediaType);
    const newFavoriteState = !isCurrentlyFavorite;

    runInAction(() => {
      if (mediaType === 'movie') {
        if (newFavoriteState) {
          this.favoriteMovieIds.add(mediaId);
        } else {
          this.favoriteMovieIds.delete(mediaId);
        }
      } else {
        if (newFavoriteState) {
          this.favoriteTvShowIds.add(mediaId);
        } else {
          this.favoriteTvShowIds.delete(mediaId);
        }
      }
      this._addOrUpdatePendingAction({
        mediaId,
        mediaType,
        favoriteState: newFavoriteState,
        timestamp: Date.now(),
        actionId: `${mediaType}-${mediaId}`,
      });
    });
    this.triggerSync();
  }

  async triggerSync() {
    if (this.isSyncing || this.pendingActions.length === 0) {
      return;
    }

    if (
      !this.tmdbAccountStore.tmdbSessionId ||
      !this.tmdbAccountStore.tmdbAccountId
    ) {
      console.warn('No TMDB session/account ID, skipping favorite sync.');
      return;
    }

    runInAction(() => {
      this.isSyncing = true;
    });

    const actionToSync = { ...this.pendingActions[0] }; // Copia para evitar problemas de mutación

    try {
      await markAsFavoriteUseCase.execute(
        this.tmdbAccountStore.tmdbAccountId!,
        this.tmdbAccountStore.tmdbSessionId!,
        actionToSync.mediaType,
        actionToSync.mediaId,
        actionToSync.favoriteState,
      );
      runInAction(() => {
        this.pendingActions = this.pendingActions.filter(
          pa => pa.actionId !== actionToSync.actionId,
        );
        this.savePendingActions();
      });
    } catch (error) {
      console.error('Failed to sync favorite action:', error);
    } finally {
      runInAction(() => {
        this.isSyncing = false;
      });
      if (this.pendingActions.length > 0) {
        this.triggerSync();
      }
    }
  }

  async loadPendingActions() {
    try {
      const storedActions = await AsyncStorage.getItem(PENDING_FAVORITES_KEY);
      if (storedActions) {
        runInAction(() => {
          this.pendingActions = JSON.parse(storedActions);
        });
        this.triggerSync();
      }
    } catch (error) {
      console.error('Failed to load pending favorite actions:', error);
    }
  }

  async savePendingActions() {
    try {
      await AsyncStorage.setItem(
        PENDING_FAVORITES_KEY,
        JSON.stringify(this.pendingActions),
      );
    } catch (error) {
      console.error('Failed to save pending favorite actions:', error);
    }
  }

  async fetchInitialFavorites() {
    if (
      this.isLoadingInitialFavorites ||
      !this.tmdbAccountStore.tmdbSessionId ||
      !this.tmdbAccountStore.tmdbAccountId
    ) {
      return;
    }
    this._setLoadingFavorite(true);
    try {
      const [movies, tvShows] = await Promise.all([
        getAllFavoriteMoviesUseCase.execute(
          this.tmdbAccountStore.tmdbAccountId!,
          this.tmdbAccountStore.tmdbSessionId!,
        ),
        getAllFavoriteTvShowsUseCase.execute(
          this.tmdbAccountStore.tmdbAccountId!,
          this.tmdbAccountStore.tmdbSessionId!,
        ),
      ]);
      runInAction(() => {
        this.favoriteMovieIds = new Set(movies.map(m => m.id));
        this.favoriteTvShowIds = new Set(tvShows.map(t => t.id));
      });
    } catch (error) {
      console.error('Failed to fetch initial favorites:', error);
    } finally {
      runInAction(() => {
        this.isLoadingInitialFavorites = false;
      });
    }
  }

  isFavorite(mediaId: number, mediaType: 'movie' | 'tv'): boolean {
    const pendingAction = this.pendingActions.find(
      pa => pa.mediaId === mediaId && pa.mediaType === mediaType,
    );
    if (pendingAction) {
      return pendingAction.favoriteState;
    }

    return mediaType === 'movie'
      ? this.favoriteMovieIds.has(mediaId)
      : this.favoriteTvShowIds.has(mediaId);
  }

  private _setLoadingFavorite(value: boolean) {
    this.isLoadingInitialFavorites = value;
  }

  private _addOrUpdatePendingAction(action: FavoriteAction) {
    const existingActionIndex = this.pendingActions.findIndex(
      pa => pa.actionId === action.actionId,
    );
    if (existingActionIndex > -1) {
      this.pendingActions.splice(existingActionIndex, 1, action);
    } else {
      this.pendingActions.push(action);
    }
    this.savePendingActions();
  }
}
