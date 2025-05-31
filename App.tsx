import React, {useContext, useEffect} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {StackNavigation} from './src/presentation/navigation/StackNavigation';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {MyStatusBar} from './src/presentation/components/base/MyStatusBar';
import {MobXProviderContext, observer, Provider} from 'mobx-react';
import rootStore from './src/presentation/utils/RootStores';
import SplashScreen from 'react-native-splash-screen';
import AuthStore from './src/presentation/screens/auth/store/AuthStore';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/presentation/utils/ToastConfig';
import {primaryBlackColor} from './src/presentation/utils/Colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import './src/presentation/utils/SuppressWarnings';

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: 'transparent'},
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
  const {authStore} = useContext(MobXProviderContext) as {authStore: AuthStore};

  useEffect(() => {
    if (
      authStore.loading !== undefined &&
      !authStore.loading &&
      authStore.isOnBoardingComplete !== undefined
    ) {
      SplashScreen.hide();
    }
  }, [authStore.loading]);

  return (
    <>
      <MyStatusBar backgroundColor={primaryBlackColor} />
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer theme={navTheme}>
          <StackNavigation
            user={authStore.user}
            onBoardingComplete={authStore.isOnBoardingComplete}
          />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </>
  );
});
