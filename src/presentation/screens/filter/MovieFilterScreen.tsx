import React, {useCallback} from 'react';
import {View} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {FlashList} from '@shopify/flash-list';

// Components
import {Toolbar} from '../../components/base/Toolbar';
import FilterButton from './component/FilterButton';
import ItemRenderer from '../../components/listing/ItemRenderer';
import {ListFooterComponent} from '../search/components/ListFooterComponent';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import {FilterBottomSheet} from './component/FilterBottomSheet';

// Hooks y utilities
import {useMovieFilter} from './hooks/useMovieFilter';
import {Movie} from '../../../domain/movie/entities/Movies';
import {
  movieFilterStyles,
  listStyles,
  itemContainer,
} from './styles/MovieFilterScreenStyles';

const MovieFilterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const {
    movieFilterStore,
    bottomSheetModalRef,
    handlePresentModalPress,
    handleModalDismiss,
    handleApplyFilter,
    handleResetFilter,
    handleOnReachToEnd,
  } = useMovieFilter();

  const renderMovieItem = useCallback(
    ({item, index}: {item: Movie; index: number}) => (
      <View style={itemContainer(index)}>
        <ItemRenderer item={item} navigation={navigation} />
      </View>
    ),
    [navigation],
  );

  return (
    <BottomSheetModalProvider>
      <View style={movieFilterStyles.container}>
        <Toolbar
          title={'Discover'}
          rightComponent={
            <FilterButton
              onFilterClicked={handlePresentModalPress}
              customStyle={movieFilterStyles.filterButton}
              isFilterActive={movieFilterStore.ui.isFilterActive}
            />
          }
        />

        {!movieFilterStore.ui.isLoading ? (
          <FlashList
            contentContainerStyle={listStyles.contentContainer}
            estimatedItemSize={220}
            data={movieFilterStore.data.movies as Movie[]}
            showsVerticalScrollIndicator={false}
            renderItem={renderMovieItem}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id.toString()}_${index}`}
            ListFooterComponent={
              <ListFooterComponent
                isLoading={movieFilterStore.ui.pageLoading}
                hasError={movieFilterStore.hasError}
              />
            }
            onEndReachedThreshold={0.5}
            onEndReached={handleOnReachToEnd}
          />
        ) : (
          <VerticalFeedSkeleton isLoading={true} />
        )}

        <FilterBottomSheet
          bottomSheetModalRef={bottomSheetModalRef}
          onDismiss={handleModalDismiss}
          onApply={handleApplyFilter}
          onReset={handleResetFilter}
          isFilterActive={movieFilterStore.ui.isFilterActive}
        />
      </View>
    </BottomSheetModalProvider>
  );
};

export default observer(MovieFilterScreen);
