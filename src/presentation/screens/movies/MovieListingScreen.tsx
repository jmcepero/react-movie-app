import React from 'react';
import {ActivityIndicator} from '@react-native-material/core';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {LoadingView} from '../../components/base/LoadingView';
import {Toolbar} from '../../components/base/Toolbar';
import MovieItem from '../../components/listing/MovieItem';
import {RootStackParams} from '../../navigation/StackNavigation';
import {Movie} from '../../../domain/movie/entities/Movies';
import {useMovieListing} from '../../hooks/useMovieListing';
import ItemRenderer from '../../components/listing/ItemRenderer';

export interface MovieListingProps
  extends StackScreenProps<RootStackParams, 'MovieListingScreen'> {}

export const MovieListingScreen = ({route}: MovieListingProps) => {
  const {category, title} = route.params;

  const {result, isLoading, pageLoading, onReachToEnd} =
    useMovieListing(category);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <LoadingView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Toolbar title={title} />
      {result.length > 0 && (
        <FlatList
          data={result as Movie[]}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <ItemRenderer item={result[index]} navigation={navigation} />
          )}
          numColumns={2}
          keyExtractor={(item, _) => item.title}
          ListFooterComponent={() => {
            return pageLoading ? (
              <View
                style={{
                  padding: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={16} />
              </View>
            ) : (
              <></>
            );
          }}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onEndReached={() => onReachToEnd()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: 'rgba(251,246,248,0.7)',
  },
  button: {
    fontFamily: 'Archivo-Regular',
    fontSize: 16,
    color: '#553081',
    alignSelf: 'center',
  },
  movieTitle: {
    fontFamily: 'Archivo-Black',
    fontSize: 12,
    color: 'rgba(251,246,248,1)',
  },
  yearTitle: {
    fontFamily: 'Archivo-Thin',
    fontSize: 12,
    color: 'rgba(251,246,248,0.7)',
    marginHorizontal: 4,
  },
});
