import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/presentation/navigation/StackNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export const App = () => {
  SystemNavigationBar.setNavigationColor('#0d0d0d');
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <StatusBar backgroundColor="rgba(23, 24, 27, 1)" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  )
}
