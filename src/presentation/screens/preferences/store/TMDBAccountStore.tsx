import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { getUserTMDBSessionUseCase } from '@domain/preferences/usecases/GetUserTMDBSessionUseCase';
import { errorHandler } from '@presentation/base/errorHandler';
import { getTMDBRequestTokenUseCase } from '@domain/preferences/usecases/GetTMDBRequestTokenUseCase';
import TMDBWebviewStore from '@components/webview/TMDBWebviewStore';
import { createTMDBSessionUseCase } from '@domain/preferences/usecases/CreateTMDBSessionUseCase';
import { saveUserTMDBSessionUseCase } from '@domain/preferences/usecases/SaveUserTMDBSessionUseCase';
import { getTMDBAccountDetailsUseCase } from '@domain/preferences/usecases/GetTMDBAccountDetailsUseCase';

class TMDBAccountStore {
  loading: boolean = false;
  isDisconnecting: boolean = false;
  tmdbSessionId: string | undefined | null = undefined;
  tmdbAccountId: string | undefined | null = undefined;
  tmdbRequestToken: string | null = null;
  error: string | null = null;
  userId: string | undefined = undefined;
  showModal: boolean = false;

  constructor(private tmdbWebviewStore: TMDBWebviewStore) {
    makeAutoObservable(this);
    reaction(
      () => [this.tmdbWebviewStore.webviewResult],
      () => {
        if (
          this.tmdbWebviewStore.webviewResult === 'allowed' &&
          this.tmdbRequestToken
        ) {
          this._createSessionId(this.tmdbRequestToken);
        }
      },
    );
  }

  onScreenLoaded(userId?: string) {
    if (!userId) return;
    this.userId = userId;
    this._loadTMDBSession(userId);
  }

  onConnectToTMDBClicked() {
    this._loadRequestToken();
  }

  onShowModalClicked() {
    this.showModal = true;
  }

  onModalDismissed() {
    this.showModal = false;
  }

  canAddToFavorite() {
    return this.tmdbSessionId !== null && this.tmdbAccountId !== null;
  }

  async disconnect() {
    if (this.userId) {
      this.isDisconnecting = true;
      try {
        await saveUserTMDBSessionUseCase.execute(this.userId, null);
        this.cleanup();
      } catch (error) {
        console.error('Failed to disconnect from TMDB', error);
      } finally {
        runInAction(() => {
          this.isDisconnecting = false;
        });
      }
    }
  }

  cleanup() {
    this.loading = false;
    this.tmdbSessionId = undefined;
    this.tmdbAccountId = undefined;
    this.tmdbRequestToken = null;
    this.error = null;
    this.userId = undefined;
    this.showModal = false;
  }

  private _setLoading(value: boolean) {
    this.loading = value;
  }

  private _setError(value: string | null) {
    this.error = value;
  }

  private _setTmdbRequestToken(value: string | null) {
    this.tmdbRequestToken = value;
  }

  private async _loadTMDBSession(userId: string) {
    this._setLoading(true);
    try {
      const sessionId = await getUserTMDBSessionUseCase.execute(userId);
      if (sessionId) {
        const accountId = await getTMDBAccountDetailsUseCase.execute(sessionId);
        runInAction(() => {
          this.tmdbSessionId = sessionId;
          this.tmdbAccountId = accountId;
        });
      } else {
        runInAction(() => {
          this.tmdbSessionId = null;
          this.tmdbAccountId = null;
        });
      }
    } catch (error) {
      const { message } = errorHandler(error);
      this._setError(message);
    } finally {
      this._setLoading(false);
    }
  }

  private async _loadRequestToken() {
    this._setLoading(true);
    try {
      const result = await getTMDBRequestTokenUseCase.execute();
      this._setTmdbRequestToken(result);
    } catch (error) {
      const { message } = errorHandler(error);
      this._setError(message);
    } finally {
      this._setLoading(false);
    }
  }

  private async _createSessionId(approvedToken: string) {
    this._setLoading(true);
    try {
      const result = await createTMDBSessionUseCase.execute(approvedToken);
      if (result && this.userId) {
        await saveUserTMDBSessionUseCase.execute(this.userId, result);
        const accountId = await getTMDBAccountDetailsUseCase.execute(result);
        runInAction(() => {
          this.tmdbSessionId = result;
          this.tmdbAccountId = accountId;
        });
      }
    } catch (error) {
      const { message } = errorHandler(error);
      console.log(message);
      this._setError(message);
    } finally {
      this._setLoading(false);
    }
  }
}

export default TMDBAccountStore;
