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
import MovieStore from './store/MovieStore';
import {styles} from './styles/HomeScreen.style';
import {movieOption} from '../../utils/Constants';
import {MobXProviderContext, observer} from 'mobx-react';
import AuthStore from '../auth/store/AuthStore';

export const HomeScreen = observer(() => {
  const {authStore, movieStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
    movieStore: MovieStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const refreshData = async () => {
    movieStore.reloadData(authStore.user?.uid);
  };

  useEffect(() => {
    if (authStore.user) refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.user, movieStore]);

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
            isLoading={movieStore.isLoading}
          />

          {/* Main Corousel */}
          <MainCarousel
            movies={movieStore.nowPlaying}
            isLoading={movieStore.isLoading}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
          />

          {/* Popular */}
          <HorizontalFeed
            title="Popular"
            movies={movieStore.popular}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
            onSeeAllClicked={() =>
              navigation.navigate('MovieListingScreen', {
                params: {type: 'byCategory', value: 'popular'},
                title: 'Popular',
              })
            }
            isLoading={movieStore.isLoading}
          />

          {/* Generes */}
          <GenresFeed
            genres={movieStore.genres}
            isLoading={movieStore.isLoading}
            onClick={value => {
              navigation.navigate('MovieListingScreen', {
                params: {type: 'byGenre', value: value.id.toString()},
                title: value.name,
              });
            }}
            onSeeAllClicked={() => {
              navigation.navigate('GenresScreen');
            }}
          />

          <HorizontalFeed
            title="For you"
            movies={movieStore.byInterest}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
            onSeeAllClicked={() => {}}
            isLoading={movieStore.isLoading}
          />

          {/* Top Rated */}
          <HorizontalFeed
            title="Top Rated"
            movies={movieStore.topRated}
            onMovieClicked={movie =>
              navigation.navigate('DetailScreen', {movieId: movie.id})
            }
            onSeeAllClicked={() =>
              navigation.navigate('MovieListingScreen', {
                category: 'topRated',
                title: 'Top Rated',
              })
            }
            isLoading={movieStore.isLoading}
          />
        </View>
      </ScrollView>

      {movieStore.error && (
        <Snackbar message={movieStore.error} style={styles.toast} />
      )}
    </View>
  );
});
