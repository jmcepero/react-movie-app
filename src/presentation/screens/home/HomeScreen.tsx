import React, {useContext, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomToolbar} from '../../components/home/CustomToolbar';
import {GenresFeed} from '../../components/home/GenresFeed';
import {MainCarousel} from '../../components/home/MainCarousel';
import {HorizontalFeed} from '../../components/HorizontalFeed';
import {SearchBar} from '../../components/home/SearchBar';
import {Snackbar} from '@react-native-material/core';
import {RefreshControl} from 'react-native-gesture-handler';
import {useMovies} from '../../hooks/useMovies';
import {styles} from './styles/HomeScreen.style';
import {movieOption} from '../../utils/Constants';
import {MobXProviderContext} from 'mobx-react';
import AuthStore from '../auth/store/AuthStore';

export const HomeScreen = () => {
  const {authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {isLoading, nowPlaying, popular, topRated, genres, error, reloadData} =
    useMovies();

  const refreshData = async () => {
    reloadData();
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
          backgroundColor: 'rgba(23, 24, 27, 1)',
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refreshData}
            tintColor={'#7B44C1'}
          />
        }>
        <View>
          {/* Toolbar Section */}
          <CustomToolbar
            title="Movies"
            onUserIconClicked={() => authStore.signOut()}
          />

          {/* Search Section */}
          <SearchBar
            onClick={() => navigation.navigate('SearchScreen', movieOption)}
            isLoading={isLoading}
          />

          {/* Main Corousel */}
          <MainCarousel
            movies={nowPlaying}
            isLoading={isLoading}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
          />

          {/* Popular */}
          <HorizontalFeed
            title="Popular"
            movies={popular}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
            onSeeAllClicked={() =>
              navigation.navigate('MovieListingScreen', {
                category: 'popular',
                title: 'Popular',
              })
            }
            isLoading={isLoading}
          />

          {/* Generes */}
          <GenresFeed genres={genres} isLoading={isLoading} />

          {/* Top Rated */}
          <HorizontalFeed
            title="Top Rated"
            movies={topRated}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
            onSeeAllClicked={() =>
              navigation.navigate('MovieListingScreen', {
                category: 'topRated',
                title: 'Top Rated',
              })
            }
            isLoading={isLoading}
          />
        </View>
      </ScrollView>

      {error && <Snackbar message={error} style={styles.toast} />}
    </View>
  );
};
