import React, { useContext, useEffect, useMemo } from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { StackNavigation } from './src/presentation/navigation/StackNavigation';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { MyStatusBar } from './src/presentation/components/base/MyStatusBar';
import { MobXProviderContext, observer, Provider } from 'mobx-react';
import rootStore from './src/presentation/utils/RootStores';
import SplashScreen from 'react-native-splash-screen';
import AuthStore from './src/presentation/screens/auth/store/AuthStore';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/presentation/utils/ToastConfig';
import { primaryBlackColor } from './src/presentation/utils/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './src/presentation/utils/SuppressWarnings';
import { useSplashOrchestation } from '@presentation/hooks/useSplashOrchestation';

const navTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: 'transparent' },
};

export const App = () => {
  SystemNavigationBar.setNavigationColor(primaryBlackColor);

  return (
    <Provider {...rootStore}>
      <AppContent />
    </Provider>
  );
};

const AppContent = observer(() => {
  const { isAppInitialized, user, onBoardingComplete, isFirstTimeOpeningApp } =
    useSplashOrchestation();

  const stackNavigationProps = useMemo(
    () => ({
      isAppInitialized,
      user,
      onBoardingComplete,
      isFirstTimeOpeningApp,
    }),
    [isAppInitialized, user, onBoardingComplete, isFirstTimeOpeningApp],
  );

  useEffect(() => {
    if (isAppInitialized) {
      SplashScreen.hide();
    }
  }, [isAppInitialized]);

  return (
    <>
      <MyStatusBar backgroundColor={primaryBlackColor} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={navTheme}>
          <StackNavigation {...stackNavigationProps} />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </>
  );
});
