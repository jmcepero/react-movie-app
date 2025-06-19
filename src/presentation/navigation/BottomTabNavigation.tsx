import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/base/BottomTabBar';
import AccountScreen from '../screens/account/AccountScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import TVShowScreen from '../screens/tv_show/TVShowScreen';
import { primaryBlackColor } from '../utils/Colors';
import FavoriteScreen from '../screens/favorites/FavoriteScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export type BottomTabParams = {
  HomeScreen: undefined;
  TVShowScreen: undefined;
  FavoriteScreen: undefined;
  AccountScreen: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigation = () => {
  return (
    <BottomSheetModalProvider>
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: primaryBlackColor,
          },
        }}
        initialRouteName={'HomeScreen'}
        tabBar={props => <BottomTabBar {...props} />}
      >
        <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
        <BottomTab.Screen name="TVShowScreen" component={TVShowScreen} />
        <BottomTab.Screen name="FavoriteScreen" component={FavoriteScreen} />
        <BottomTab.Screen name="AccountScreen" component={AccountScreen} />
      </BottomTab.Navigator>
    </BottomSheetModalProvider>
  );
};
