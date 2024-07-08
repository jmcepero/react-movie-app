import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigation} from './BottomTabNavigation';
import {MovieListingScreen} from '../screens/movies/MovieListingScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {Movie} from '../../domain/movie/entities/Movies';
import {WatchProviderScreen} from '../screens/warch_provider/WatchProviderScreen';
import {TVShowDetailScreen} from '../screens/tv_show/TVShowDetailScreen';
import {DetailScreen} from '../screens/movies/DetailScreen';
import {Platform} from 'react-native';
import {SearchOption} from '../utils/Constants';
import {PersonDetailScreen} from '../screens/person/PersonDetailScreen';

export type RootStackParams = {
  BottomTabNavigation: undefined;
  DetailScreen: Movie;
  MovieListingScreen: {
    category: 'popular' | 'topRated';
    title: 'Popular' | 'Top Rated';
  };
  SearchScreen: SearchOption;
  WatchProviderScreen: {
    itemId: string;
    itemType: 'movie' | 'tvShow';
  };
  TVShowDetailScreen: {
    tvShowId: string;
  };
  PersonDetailScreen: {
    personId: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigation"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'rgba(23, 24, 27, 1)',
        },
        headerStyle: {
          backgroundColor: 'black',
        },
        presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
      }}>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="MovieListingScreen" component={MovieListingScreen} />
      <Stack.Screen
        name="WatchProviderScreen"
        component={WatchProviderScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="TVShowDetailScreen" component={TVShowDetailScreen} />
      <Stack.Screen name="PersonDetailScreen" component={PersonDetailScreen} />
    </Stack.Navigator>
  );
};
