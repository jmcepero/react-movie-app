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
    <BottomTab.Navigator screenOptions={{
      headerShown: false,
    }} initialRouteName={'HomeScreen'} tabBar={(props) => <BottomTabBar {...props} />}>
      <BottomTab.Screen name='HomeScreen' component={HomeScreen} />
      <BottomTab.Screen name='TvShowScreen' component={TvShowScreen} />
      <BottomTab.Screen name='ExploreScreen' component={ExploreScreen} />
      <BottomTab.Screen name='AccountScreen' component={AccountScreen} />
    </BottomTab.Navigator>
  )
}
