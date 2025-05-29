import { useContext, useEffect } from 'react';
import {RefreshControl, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomToolbar from '../../components/home/CustomToolbar';
import {SearchBar} from '../../components/home/SearchBar';
import {Snackbar} from '@react-native-material/core';
import {TVShowCarousel} from './components/TVShowCarousel';
import {TVShowHorizontalFeed} from './components/TVShowHorizontalFeed';
import {TVShowStore} from './store/TvShowStore';
import {styles} from './style/TvShow.style';
import {tvShowOption} from '../../utils/Constants';
import {MobXProviderContext, observer} from 'mobx-react';
import AuthStore from '../auth/store/AuthStore';
import {GenresFeed} from '../../components/home/GenresFeed';

const TVShowScreen = () => {
  const {tvShowStore, authStore} = useContext(MobXProviderContext) as {
    authStore: AuthStore;
    tvShowStore: TVShowStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const refreshData = async () => {
    tvShowStore.loadTvShows();
  };

  useEffect(() => {
    refreshData();
  }, [tvShowStore]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewContainer}
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
            title="TV Shows"
            userPhoto={authStore.user?.photoURL}
            onUserIconClicked={() => authStore.signOut()}
          />

          {/* Search Section */}
          <SearchBar
            onClick={() => navigation.navigate('SearchScreen', tvShowOption)}
            isLoading={tvShowStore.isLoading}
            onFilterClicked={() => {}}
          />

          {/* Main Corousel */}
          <TVShowCarousel
            title="Top Rated"
            tvShows={tvShowStore.topRated}
            isLoading={tvShowStore.isLoading}
            onTVShowClicked={tvShow => {
              navigation.navigate('TVShowDetailScreen', {tvShowId: tvShow.id});
            }}
          />

          {/* Popular */}
          <TVShowHorizontalFeed
            title="Popular"
            tvShows={tvShowStore.popular}
            onTVShowClicked={tvShow => {
              navigation.navigate('TVShowDetailScreen', {tvShowId: tvShow.id});
            }}
            onSeeAllClicked={() => {}}
            isLoading={tvShowStore.isLoading}
          />

          {/* Generes */}
          <GenresFeed
            genres={tvShowStore.genres}
            isLoading={tvShowStore.isLoading}
            onClick={value => {
              /*navigation.navigate('MovieListingScreen', {
                params: {type: 'byGenre', value: value.id.toString()},
                title: value.name,
              });*/
            }}
            onSeeAllClicked={() => {
              //navigation.navigate('GenresScreen');
            }}
          />

          {/* Top Rated */}
          <TVShowHorizontalFeed
            title="On The Air"
            tvShows={tvShowStore.onTheAir}
            onTVShowClicked={tvShow => {
              navigation.navigate('TVShowDetailScreen', {tvShowId: tvShow.id});
            }}
            onSeeAllClicked={() => {}}
            isLoading={tvShowStore.isLoading}
          />
        </View>
      </ScrollView>

      {tvShowStore.error && (
        <Snackbar message={tvShowStore.error} style={styles.snackBarError} />
      )}
    </View>
  );
};

export default observer(TVShowScreen);
