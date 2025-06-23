import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UnderConstructionView } from '../empty_states/EmptyStates';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import FavoritesList from './components/FavoritesList';
import { MobXProviderContext, observer } from 'mobx-react';
import FavoritesListStore from './store/FavoritesListStore';
import TMDBAccountStore from '../preferences/store/TMDBAccountStore';
import {
  primaryBackgroundColor,
  primaryBlackColor,
  primaryRed,
  primaryTextColor,
  secondaryTextColor,
} from '@presentation/utils/Colors';
import {
  CustomTabBarRendererProps,
  renderTabBar,
} from '../preferences/components/CustomTab';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteScreen = () => {
  const { favoritesListStore, tmdbAccountStore } = useContext(
    MobXProviderContext,
  ) as {
    favoritesListStore: FavoritesListStore;
    tmdbAccountStore: TMDBAccountStore;
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'movies', title: 'Movies' },
    { key: 'tvShows', title: 'TV Shows' },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'movies':
        return <FavoritesList mediaType="movie" onEndReached={loadMovies} />;
      case 'tvShows':
        return <FavoritesList mediaType="tv" onEndReached={loadTvShows} />;
      default:
        return null;
    }
  };

  const { tmdbAccountId, tmdbSessionId } = tmdbAccountStore;

  const loadMovies = useCallback(() => {
    if (tmdbAccountId && tmdbSessionId) {
      favoritesListStore.fetchFavoriteMovies(tmdbAccountId, tmdbSessionId);
    }
  }, [tmdbAccountId, tmdbSessionId, favoritesListStore]);

  const loadTvShows = useCallback(() => {
    if (tmdbAccountId && tmdbSessionId) {
      favoritesListStore.fetchFavoriteTvShows(tmdbAccountId, tmdbSessionId);
    }
  }, [tmdbAccountId, tmdbSessionId, favoritesListStore]);

  useFocusEffect(
    useCallback(() => {
      loadMovies();

      return () => {
        console.log('FavoriteScreen lost focus, cleaning up...');
        favoritesListStore.cleanup();
      };
    }, [loadMovies]),
  );

  useEffect(() => {
    if (index === 1 && favoritesListStore.tvShows.result.length === 0) {
      loadTvShows();
    }
  }, [index, favoritesListStore.tvShows.result.length]);

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => renderTabBar(props as CustomTabBarRendererProps)}
      />
    </View>
  );
};

export default observer(FavoriteScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBlackColor,
  },
  tabBar: {
    backgroundColor: primaryBackgroundColor,
    elevation: 0, // Android
    shadowOpacity: 0, // iOS
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  indicator: {
    backgroundColor: primaryRed,
    height: 3,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
