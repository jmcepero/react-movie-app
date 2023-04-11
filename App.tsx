import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/presentation/navigation/StackNavigation';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { MyStatusBar } from './src/presentation/components/base/MyStatusBar';

export const App = () => {
  SystemNavigationBar.setNavigationColor('#0d0d0d');
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(23, 24, 27, 1)'} />
      <View style={{
        flex: 1,
      }}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </View>
    </>
  )
}
