import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParams} from '../../../navigation/StackNavigation';

export const useMovieListingParams = () => {
  const route = useRoute<RouteProp<RootStackParams, 'MovieListingScreen'>>();

  if (!route.params || !route.params.listType) {
    throw new Error('Missing required route parameters');
  }

  return {
    title: route.params.title || 'Movies',
    type: route.params.listType,
  };
};
