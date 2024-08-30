import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigation} from './BottomTabNavigation';
import {MovieListingScreen} from '../screens/movies/MovieListingScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {WatchProviderScreen} from '../screens/warch_provider/WatchProviderScreen';
import {TVShowDetailScreen} from '../screens/tv_show/TVShowDetailScreen';
import {DetailScreen} from '../screens/movies/DetailScreen';
import {Platform} from 'react-native';
import {SearchOption} from '../utils/Constants';
import {PersonDetailScreen} from '../screens/person/PersonDetailScreen';
import RegisterScreen from '../screens/auth/screens/RegisterScreen';
import LoginScreen from '../screens/auth/screens/LoginScreen';
import {MobXProviderContext} from 'mobx-react';
import AuthStore from '../screens/auth/store/AuthStore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type RootStackParams = {
  BottomTabNavigation: undefined;
  DetailScreen: {
    movieId: string;
  };
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
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

interface StackNavigationProps {
  user: FirebaseAuthTypes.User | null | undefined;
}

export const StackNavigation = ({user}: StackNavigationProps) => {
  return (
    <Stack.Navigator
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
      {user !== undefined && user === null ? (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{title: 'Register'}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
          />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen
            name="MovieListingScreen"
            component={MovieListingScreen}
          />
          <Stack.Screen
            name="WatchProviderScreen"
            component={WatchProviderScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen
            name="TVShowDetailScreen"
            component={TVShowDetailScreen}
          />
          <Stack.Screen
            name="PersonDetailScreen"
            component={PersonDetailScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
