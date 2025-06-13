import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigation} from './BottomTabNavigation';
import MovieListingScreen from '../screens/movies/MovieListingScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {WatchProviderScreen} from '../screens/warch_provider/WatchProviderScreen';
import {TVShowDetailScreen} from '../screens/tv_show/TVShowDetailScreen';
import {DetailScreen} from '../screens/movies/DetailScreen';
import {Platform} from 'react-native';
import {SearchOption} from '../utils/Constants';
import {PersonDetailScreen} from '../screens/person/PersonDetailScreen';
import RegisterScreen from '../screens/auth/screens/RegisterScreen';
import LoginScreen from '../screens/auth/screens/LoginScreen';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SetYourNameScreen from '../screens/preferences/SetYourNameScreen';
import SetGnresPreferencesScreen from '../screens/preferences/SetGnresPreferencesScreen';
import MovieGenresScreen from '../screens/genres/MovieGenresScreen';
import MovieFilter from '../screens/filter/MovieFilterScreen';
import {primaryBlackColor} from '../utils/Colors';
import OnboardingScreen from '../screens/onboarding/OnBoardingScreen';
import TMDBAccountScreen from '../screens/preferences/TMDBAccountScreen';
import TMDBWebviewScreen, {
  TMDBWebviewProps,
} from '../components/webview/TMDBWebviewScreen';

export interface MovieListingParams {
  title: string;
  listType: 'popular' | 'topRated';
}

export type RootStackParams = {
  BottomTabNavigation: undefined;
  DetailScreen: {
    movieId: string;
  };
  MovieListingScreen: MovieListingParams;
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
  SetYourNameScreen: undefined;
  SetGnresPreferences: undefined;
  GenresScreen: undefined;
  MovieFilter:
    | {
        genre: number;
      }
    | undefined;
  OnBoardingScreen: undefined;
  TMDBAccountConexionScreen: undefined;
  TMDBAccountScreen: undefined;
  TMDBWebviewScreen: TMDBWebviewProps;
};

const Stack = createNativeStackNavigator<RootStackParams>();

interface StackNavigationProps {
  user: FirebaseAuthTypes.User | null | undefined;
  onBoardingComplete: boolean | null | undefined;
  isFirstTimeOpeningApp: boolean | null;
}

export const StackNavigation = ({
  user,
  onBoardingComplete,
  isFirstTimeOpeningApp,
}: StackNavigationProps) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="TMDBAccountScreen"
        component={TMDBAccountScreen}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="TMDBWebviewScreen"
        component={TMDBWebviewScreen}
        options={{title: 'Webview'}}
      />
    </Stack.Navigator>
  );

  if (user === undefined && onBoardingComplete === undefined) {
    return null;
  }

  if (isFirstTimeOpeningApp === true) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnboardingScreen}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
        contentStyle: {
          backgroundColor: primaryBlackColor,
        },
        animation: 'slide_from_right',
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
      ) : onBoardingComplete !== undefined && !onBoardingComplete ? (
        <>
          {!user?.displayName && (
            <Stack.Screen
              name="SetYourNameScreen"
              component={SetYourNameScreen}
              options={{title: 'SetYourNameScreen'}}
            />
          )}
          <Stack.Screen
            name="SetGnresPreferences"
            component={SetGnresPreferencesScreen}
            options={{title: 'SetGnresPreferences'}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{title: 'BottomTabNavigation'}}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{title: 'DetailScreen'}}
          />
          <Stack.Screen
            name="MovieListingScreen"
            component={MovieListingScreen}
            options={{title: 'MovieListingScreen'}}
          />
          <Stack.Screen
            name="WatchProviderScreen"
            component={WatchProviderScreen}
            options={{title: 'WatchProviderScreen'}}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{title: 'SearchScreen'}}
          />
          <Stack.Screen
            name="TVShowDetailScreen"
            component={TVShowDetailScreen}
            options={{title: 'TVShowDetailScreen'}}
          />
          <Stack.Screen
            name="PersonDetailScreen"
            component={PersonDetailScreen}
            options={{title: 'PersonDetailScreen'}}
          />
          <Stack.Screen
            name="GenresScreen"
            component={MovieGenresScreen}
            options={{title: 'Genres'}}
          />
          <Stack.Screen
            name="MovieFilter"
            component={MovieFilter}
            options={{title: 'MovieFilter'}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
