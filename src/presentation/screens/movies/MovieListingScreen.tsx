import { useCallback, useContext, useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Toolbar } from '../../components/base/Toolbar';
import { Movie } from '../../../domain/movie/entities/Movies';
import MovieListingStore from './store/MovieListingStore';
import ItemRenderer from '../../components/listing/ItemRenderer';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import { ListFooterComponent } from '../search/components/ListFooterComponent';
import { MobXProviderContext, observer } from 'mobx-react';
import { useMovieListingParams } from './hooks/useMovieListingParams';
import {
  itemContainer,
  listStyles,
} from '../filter/styles/MovieFilterScreenStyles';
import { FlashList } from '@shopify/flash-list';

const MovieListingScreen = () => {
  const { movieListingStore } = useContext(MobXProviderContext) as {
    movieListingStore: MovieListingStore;
  };
  const { title, type } = useMovieListingParams();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const renderMovieItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => (
      <View style={itemContainer(index)}>
        <ItemRenderer item={item} navigation={navigation} />
      </View>
    ),
    [navigation],
  );

  useEffect(() => {
    movieListingStore.onScreenLoaded(type);
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar title={title} />
      {!movieListingStore.isLoading ? (
        <FlashList
          contentContainerStyle={listStyles.contentContainer}
          estimatedItemSize={220}
          data={movieListingStore.result as Movie[]}
          showsVerticalScrollIndicator={false}
          renderItem={renderMovieItem}
          numColumns={2}
          keyExtractor={(item, index) => `${item.id.toString()}_${index}`}
          ListFooterComponent={
            <ListFooterComponent
              isLoading={movieListingStore.pageLoading}
              hasError={movieListingStore.error.length > 0}
            />
          }
          onEndReachedThreshold={0.5}
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
});
