import React, {useEffect} from 'react';
import {RefreshControl, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomToolbar} from '../../components/home/CustomToolbar';
import {SearchBar} from '../../components/home/SearchBar';
import {Snackbar} from '@react-native-material/core';
import {TVShowCarousel} from './components/TVShowCarousel';
import {TVShowHorizontalFeed} from './components/TVShowHorizontalFeed';
import {useTvShow} from '../../hooks/useTvShow';
import {styles} from './style/TvShow.style';
import {tvShowOption} from '../../utils/Constants';

export const TVShowScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {isLoading, onTheAir, popular, topRated, error, loadTvShows} =
    useTvShow();

  const refreshData = () => {
    loadTvShows();
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshData}
            tintColor={'#7B44C1'}
          />
        }>
        <View>
          {/* Toolbar Section */}
          <CustomToolbar title="TV Shows" />

          {/* Search Section */}
          <SearchBar
            onClick={() => navigation.navigate('SearchScreen', tvShowOption)}
          />

          {/* Main Corousel */}
          <TVShowCarousel
            title="Top Rated"
            tvShows={topRated}
            onTVShowClicked={tvShow => {
              navigation.navigate('TVShowDetailScreen', {tvShowId: tvShow.id});
            }}
          />

          {/* Popular */}
          <TVShowHorizontalFeed
            title="Popular"
            tvShows={popular}
            onTVShowClicked={tvShow => {
              navigation.navigate('TVShowDetailScreen', {tvShowId: tvShow.id});
            }}
            onSeeAllClicked={() => {}}
          />

          {/* Top Rated */}
          <TVShowHorizontalFeed
            title="On The Air"
            tvShows={onTheAir}
            onTVShowClicked={tvShow => {
              navigation.navigate('TVShowDetailScreen', {tvShowId: tvShow.id});
            }}
            onSeeAllClicked={() => {}}
          />
        </View>
      </ScrollView>

      {error && <Snackbar message={error} style={styles.snackBarError} />}
    </View>
  );
};
