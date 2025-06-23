import AuthStore from '@presentation/screens/auth/store/AuthStore';
import { FavoritesStore } from '@presentation/screens/favorites/store/FavoritesStore';
import TMDBAccountStore from '@presentation/screens/preferences/store/TMDBAccountStore';
import { MobXProviderContext } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';

export const useSplashOrchestation = () => {
  const { authStore, tmdbAccountStore, favoritesStore } = useContext(
    MobXProviderContext,
  ) as {
    authStore: AuthStore;
    tmdbAccountStore: TMDBAccountStore;
    favoritesStore: FavoritesStore;
  };

  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const [authStoreReady, setAuthStoreReady] = useState(false);
  const [tmdbStoreReady, setTmdbStoreReady] = useState(false);
  const [favoritesStoreReady, setFavoritesStoreReady] = useState(false);

  // Level 1: AuthStore Initialization
  useEffect(() => {
    if (isAppInitialized) return;
    if (
      authStore.loading === false &&
      authStore.isOnBoardingComplete !== undefined &&
      authStore.isFirstTimeOpeningApp !== null
    ) {
      console.log('AppInitHook: AuthStore is ready.');
      setAuthStoreReady(true);
    }
  }, [
    isAppInitialized,
    authStore.loading,
    authStore.isOnBoardingComplete,
    authStore.isFirstTimeOpeningApp,
  ]);

  // Level 2: TMDBAccountStore Initialization
  useEffect(() => {
    if (isAppInitialized || !authStoreReady) return;

    if (authStore.user && authStore.user.uid) {
      if (
        tmdbAccountStore.tmdbSessionId === undefined &&
        !tmdbAccountStore.loading
      ) {
        console.log('AppInitHook: Triggering TMDBAccountStore initialization.');
        tmdbAccountStore.onScreenLoaded(authStore.user.uid);
      }

      if (
        tmdbAccountStore.loading === false &&
        tmdbAccountStore.tmdbSessionId !== undefined
      ) {
        console.log('AppInitHook: TMDBAccountStore is ready.');
        setTmdbStoreReady(true);
      }
    } else {
      console.log('AppInitHook: TMDBAccountStore skipped (no user).');
      setTmdbStoreReady(true);
    }
  }, [
    isAppInitialized,
    authStoreReady,
    tmdbAccountStore.loading,
    tmdbAccountStore.tmdbSessionId,
  ]);

  // Level 3: FavoritesStore Initialization
  useEffect(() => {
    if (isAppInitialized || !tmdbStoreReady) return;

    if (tmdbAccountStore.tmdbSessionId && tmdbAccountStore.tmdbAccountId) {
      if (favoritesStore.isLoadingInitialFavorites === false) {
        console.log('AppInitHook: FavoritesStore is ready.');
        setFavoritesStoreReady(true);
      }
    } else {
      console.log(
        'AppInitHook: FavoritesStore skipped (no TMDB session/accountId).',
      );
      setFavoritesStoreReady(true);
    }
  }, [
    tmdbStoreReady,
    tmdbAccountStore.tmdbSessionId,
    tmdbAccountStore.tmdbAccountId,
    favoritesStore.isLoadingInitialFavorites,
  ]);

  // Etapa Final: Marcar la aplicación como inicializada
  useEffect(() => {
    if (isAppInitialized) return;
    if (authStoreReady && tmdbStoreReady && favoritesStoreReady) {
      console.log('AppInitHook: All stores initialized. App is ready.');
      setIsAppInitialized(true);
    }
  }, [isAppInitialized, authStoreReady, tmdbStoreReady, favoritesStoreReady]);

  return {
    isAppInitialized,
    user: authStore.user,
    onBoardingComplete: authStore.isOnBoardingComplete,
    isFirstTimeOpeningApp: authStore.isFirstTimeOpeningApp,
  };
};
