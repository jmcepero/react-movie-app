import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '../screens/DetailScreen';
import { MovieResponse } from '../../data/movie/entities/MovieInterface';
import { BottomTabNavigation } from './BottomTabNavigation';
import { MovieListingScreen } from '../screens/MovieListingScreen';

export type RootStackParams = {
  BottomTabNavigation: undefined,
  DetailScreen: MovieResponse
  MovieListingScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
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
    </Stack.Navigator>
  );
}