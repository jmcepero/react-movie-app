import React from 'react';
import {View} from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {StackNavigation} from './src/presentation/navigation/StackNavigation';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {MyStatusBar} from './src/presentation/components/base/MyStatusBar';
import {Provider} from 'mobx-react';
import rootStore from './src/presentation/utils/RootStores';

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const App = () => {
  SystemNavigationBar.setNavigationColor('#0d0d0d');
  return (
    <Provider {...rootStore}>
      <AppContent />
    </Provider>
  );
};

const AppContent = () => {
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(23, 24, 27, 1)'} />
      <View
        style={{
          flex: 1,
        }}>
        <NavigationContainer theme={navTheme}>
          <StackNavigation />
        </NavigationContainer>
      </View>
    </>
  );
};
