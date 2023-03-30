import { Text } from '@react-native-material/core'
import React from 'react'
import { View } from 'react-native'
import { useMoviesError } from '../hooks/useMoviesError'

export const TvShowScreen = () => {
  const { nowPlaying, error } = useMoviesError()

  return (<View style={{ flex: 1, backgroundColor: 'gray' }}>
    <Text>{JSON.stringify(nowPlaying)}</Text>
    <Text>{error}</Text>
  </View>)
}
