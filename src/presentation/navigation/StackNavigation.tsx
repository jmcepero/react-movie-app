import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '../screens/DetailScreen';
import { MovieResponse } from '../../data/movie/entities/MovieInterface';
import { BottomTabNavigation } from './BottomTabNavigation';
import { MovieListingScreen, MovieListingProps } from '../screens/movies/MovieListingScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { Movie } from '../../domain/movie/entities/Movies';

export type RootStackParams = {
  BottomTabNavigation: undefined;
  DetailScreen: Movie;
  MovieListingScreen: {
    category: 'popular' | 'topRated';
    title: 'Popular' | 'Top Rated'
  };
  SearchScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='BottomTabNavigation'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'rgba(23, 24, 27, 1)'
        },
        headerStyle: {
          backgroundColor: 'black'
        }
      }}>
      <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="MovieListingScreen" component={MovieListingScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}