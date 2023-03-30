import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import BottomTabBar from '../components/base/BottomTabBar'
import { AccountScreen } from '../screens/AccountScreen'
import { ExploreScreen } from '../screens/ExploreScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { TvShowScreen } from '../screens/TvShowScreen'

export type BottomTabParams = {
  HomeScreen: undefined,
  TvShowScreen: undefined,
  ExploreScreen: undefined,
  AccountScreen: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParams>()

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator sceneContainerStyle={{
      backgroundColor: 'rgba(23, 24, 27, 1)'
    }} screenOptions={{
      headerShown: false,
    }} initialRouteName={'TvShowScreen'} tabBar={(props) => <BottomTabBar {...props} />}>
      <BottomTab.Screen name='HomeScreen' component={HomeScreen} />
      <BottomTab.Screen name='TvShowScreen' component={TvShowScreen} />
      <BottomTab.Screen name='ExploreScreen' component={ExploreScreen} />
      <BottomTab.Screen name='AccountScreen' component={AccountScreen} />
    </BottomTab.Navigator>
  )
}
