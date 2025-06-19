import React, { useCallback, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MobXProviderContext, observer } from 'mobx-react';
import FavoritesListStore from '../store/FavoritesListStore';
import { primaryRed } from '@presentation/utils/Colors';
import VerticalFeedSkeleton from '@presentation/components/base/skeleton/VerticalFeedSkeleton';
import ItemRenderer from '@presentation/components/listing/ItemRenderer';
import {
  itemContainer,
  listStyles,
} from '@presentation/screens/filter/styles/MovieFilterScreenStyles';
import { Item } from '@domain/base/Item';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import EmptyStateView from '@presentation/screens/empty_states/EmptyStateView';
import { NoResultsView } from '@presentation/screens/empty_states/EmptyStates';
import { ListFooterComponent } from '@presentation/screens/search/components/ListFooterComponent';

type FavoritesListProps = {
  mediaType: 'movie' | 'tv';
  onEndReached: () => void;
};

const FavoritesList = ({ mediaType, onEndReached }: FavoritesListProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { favoritesListStore } = useContext(MobXProviderContext) as {
    favoritesListStore: FavoritesListStore;
  };

  const data =
    mediaType === 'movie'
      ? favoritesListStore.movies.result
      : favoritesListStore.tvShows.result;

  const isLoading =
    mediaType === 'movie'
      ? favoritesListStore.movies.isLoading
      : favoritesListStore.tvShows.isLoading;

  const isPageLoading =
    mediaType === 'movie'
      ? favoritesListStore.movies.isPageLoading
      : favoritesListStore.tvShows.isPageLoading;

  const renderItem = useCallback(
    ({ item, index }: { item: Item; index: number }) => (
      <View style={itemContainer(index)}>
        <ItemRenderer item={item} navigation={navigation} />
      </View>
    ),
    [navigation],
  );

  if (isLoading && data.length === 0) {
    return <VerticalFeedSkeleton isLoading={true} />;
  }

  return (
    <FlashList
      contentContainerStyle={listStyles.contentContainer}
      data={data}
      numColumns={2}
      keyExtractor={item => `${mediaType}-${item.id}`}
      estimatedItemSize={220}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => (
        <ListFooterComponent
          isLoading={isPageLoading}
          hasError={favoritesListStore.hasError()}
        />
      )}
      ListEmptyComponent={() => <NoResultsView />}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    marginVertical: 20,
  },
  itemContainer: {
    flex: 1,
    padding: 4,
  },
});

export default observer(FavoritesList);
