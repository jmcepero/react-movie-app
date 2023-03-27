import React from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

export const App = () => {
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
