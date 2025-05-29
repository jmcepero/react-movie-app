import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/base/BottomTabBar';
import AccountScreen from '../screens/account/AccountScreen';
import {HomeScreen} from '../screens/home/HomeScreen';
import TVShowScreen from '../screens/tv_show/TVShowScreen';
import {ExploreScreen} from '../screens/explore/ExploreScreen';
import {primaryBlackColor} from '../utils/Colors';

export type BottomTabParams = {
  HomeScreen: undefined;
  TVShowScreen: undefined;
  ExploreScreen: undefined;
  AccountScreen: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: primaryBlackColor,
        },
      }}
      initialRouteName={'HomeScreen'}
      tabBar={props => <BottomTabBar {...props} />}>
      <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTab.Screen name="TVShowScreen" component={TVShowScreen} />
      <BottomTab.Screen name="ExploreScreen" component={ExploreScreen} />
      <BottomTab.Screen name="AccountScreen" component={AccountScreen} />
    </BottomTab.Navigator>
  );
};
