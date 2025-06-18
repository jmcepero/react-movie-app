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

  // Etapa 1: AuthStore Initialization
  useEffect(() => {
    if (
      authStore.loading === false &&
      authStore.isOnBoardingComplete !== undefined &&
      authStore.isFirstTimeOpeningApp !== null
    ) {
      console.log('AppInitHook: AuthStore is ready.');
      setAuthStoreReady(true);
    }
  }, [
    authStore.loading,
    authStore.isOnBoardingComplete,
    authStore.isFirstTimeOpeningApp,
  ]);

  // Etapa 2: TMDBAccountStore Initialization (después de AuthStore)
  useEffect(() => {
    if (!authStoreReady) return;

    if (authStore.user && authStore.user.uid) {
      // Solo llamar si TMDB no ha sido inicializado o está en su estado inicial
      if (
        tmdbAccountStore.tmdbSessionId === undefined &&
        !tmdbAccountStore.loading
      ) {
        console.log('AppInitHook: Triggering TMDBAccountStore initialization.');
        tmdbAccountStore.onScreenLoaded(authStore.user.uid);
      }
      // Esperar a que TMDBAccountStore termine de cargar
      if (
        tmdbAccountStore.loading === false &&
        tmdbAccountStore.tmdbSessionId !== undefined
      ) {
        // tmdbSessionId puede ser string o null, undefined significa que no ha terminado el proceso
        console.log('AppInitHook: TMDBAccountStore is ready.');
        setTmdbStoreReady(true);
      }
    } else {
      // No hay usuario, por lo tanto, no hay sesión TMDB que cargar.
      console.log('AppInitHook: TMDBAccountStore skipped (no user).');
      setTmdbStoreReady(true);
    }
  }, [
    authStoreReady,
    tmdbAccountStore.loading,
    tmdbAccountStore.tmdbSessionId, // Reaccionar a cuando tmdbSessionId se establece
  ]);

  // Etapa 3: FavoritesStore Initialization (después de TMDBAccountStore)
  useEffect(() => {
    if (!tmdbStoreReady) return; // Esperar a que TMDBAccountStore esté listo

    if (tmdbAccountStore.tmdbSessionId && tmdbAccountStore.tmdbAccountId) {
      // Solo llamar si Favorites no ha sido inicializado o está en su estado inicial
      if (favoritesStore.isLoadingInitialFavorites === undefined) {
        // Esta condición es para evitar recargar si ya tiene datos,
        // aunque fetchInitialFavorites tiene su propio guard `isLoadingInitialFavorites`
        console.log('AppInitHook: Triggering FavoritesStore initialization.');
        favoritesStore.fetchInitialFavorites();
      }
      // Esperar a que FavoritesStore termine de cargar
      if (favoritesStore.isLoadingInitialFavorites === false) {
        console.log('AppInitHook: FavoritesStore is ready.');
        setFavoritesStoreReady(true);
      }
    } else {
      // No hay sesión TMDB o accountId, no se pueden cargar favoritos.
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
    if (authStoreReady && tmdbStoreReady && favoritesStoreReady) {
      console.log('AppInitHook: All stores initialized. App is ready.');
      setIsAppInitialized(true);
    }
  }, [authStoreReady, tmdbStoreReady, favoritesStoreReady]);

  return {
    isAppInitialized,
    user: authStore.user,
    onBoardingComplete: authStore.isOnBoardingComplete,
    isFirstTimeOpeningApp: authStore.isFirstTimeOpeningApp,
  };
};
