import React, {useContext, useEffect} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Toolbar} from '../../components/base/Toolbar';
import {RootStackParams} from '../../navigation/StackNavigation';
import {Movie} from '../../../domain/movie/entities/Movies';
import MovieListingStore from './store/MovieListingStore';
import ItemRenderer from '../../components/listing/ItemRenderer';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import {ListFooterComponent} from '../search/components/ListFooterComponent';
import {MobXProviderContext, observer} from 'mobx-react';

export interface MovieListingProps
  extends StackScreenProps<RootStackParams, 'MovieListingScreen'> {}

const MovieListingScreen = ({route}: MovieListingProps) => {
  const {movieListingStore} = useContext(MobXProviderContext) as {
    movieListingStore: MovieListingStore;
  };
  const {title} = route.params;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    movieListingStore.onScreenLoaded(route.params);
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar title={title} />
      {!movieListingStore.isLoading ? (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          data={movieListingStore.result as Movie[]}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <ItemRenderer
              item={movieListingStore.result[index]}
              navigation={navigation}
            />
          )}
          numColumns={2}
          keyExtractor={(item, _) => item.title}
          ListFooterComponent={
            <ListFooterComponent
              isLoading={movieListingStore.pageLoading}
              hasError={movieListingStore.error.length > 0}
            />
          }
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onEndReached={() => movieListingStore.onReachToEnd()}
        />
      ) : (
        <VerticalFeedSkeleton isLoading={true} />
      )}
    </View>
  );
};

export default observer(MovieListingScreen);

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
