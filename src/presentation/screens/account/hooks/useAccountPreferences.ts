import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import AuthStore from '@screens/auth/store/AuthStore';
import TMDBAccountStore from '@screens/preferences/store/TMDBAccountStore';
import { FavoritesStore } from '@screens/favorites/store/FavoritesStore';

export const useAccountPreferences = () => {
  const { authStore, tmdbAccountStore, favoritesStore } = useContext(
    MobXProviderContext,
  ) as {
    authStore: AuthStore;
    tmdbAccountStore: TMDBAccountStore;
    favoritesStore: FavoritesStore;
  };

  const isTMDBConnected = !!tmdbAccountStore.tmdbSessionId;
  const favoriteMoviesCount = favoritesStore.favoriteMovieIds.size;
  const favoriteTvShowsCount = favoritesStore.favoriteTvShowIds.size;

  const handleConnectTMDB = () => {
    tmdbAccountStore.onConnectToTMDBClicked();
  };

  const handleDisconnectTMDB = async () => {
    await tmdbAccountStore.disconnect();
    favoritesStore.cleanup();
  };

  const handleLogout = () => {
    tmdbAccountStore.cleanup();
    favoritesStore.cleanup();
    authStore.signOut();
  };

  return {
    user: authStore.user,
    isTMDBConnected,
    isConnecting: tmdbAccountStore.loading,
    isDisconnecting: tmdbAccountStore.isDisconnecting,
    favoriteMoviesCount,
    favoriteTvShowsCount,
    handleConnectTMDB,
    handleDisconnectTMDB,
    handleLogout,
  };
};
