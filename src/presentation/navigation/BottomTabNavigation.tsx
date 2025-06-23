import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/base/BottomTabBar';
import AccountScreen from '../screens/account/AccountScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import TVShowScreen from '../screens/tv_show/TVShowScreen';
import { primaryBlackColor } from '../utils/Colors';
import FavoriteScreen from '../screens/favorites/FavoriteScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { ScrollAnimationContext } from '@presentation/utils/ScrollAnimationContext';

export type BottomTabParams = {
  HomeScreen: undefined;
  TVShowScreen: undefined;
  FavoriteScreen: undefined;
  AccountScreen: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isVisibleRef = useRef(isTabBarVisible);

  useEffect(() => {
    isVisibleRef.current = isTabBarVisible;
  }, [isTabBarVisible]);

  scrollY.addListener(({ value }) => {
    if (value < 0) {
      return;
    }

    const diff = value - lastScrollY.current;

    if (diff === 0) {
      return;
    }

    const isScrollingDown = diff > 0;

    if (isScrollingDown && isVisibleRef.current) {
      setIsTabBarVisible(false);
    }

    if (!isScrollingDown && !isVisibleRef.current) {
      setIsTabBarVisible(true);
    }

    lastScrollY.current = value;
  });

  return (
    <ScrollAnimationContext.Provider value={{ scrollY, isTabBarVisible }}>
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
    </ScrollAnimationContext.Provider>
  );
};
