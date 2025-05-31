import {useCallback, useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import SearchInput from '../../components/base/SearchInput';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigation';
import {searchesOptions} from '../../utils/Constants';
import {ListFooterComponent} from './components/ListFooterComponent';
import ChipsGroup from './components/ChipGroup';
import ItemRenderer from '../../components/listing/ItemRenderer';
import {MobXProviderContext, observer} from 'mobx-react';
import SearchStore from './store/SearchStore';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import {Movie} from '../../../domain/movie/entities/Movies';
import {itemContainer} from '../filter/styles/MovieFilterScreenStyles';
import {FlashList} from '@shopify/flash-list';
import NoResultsComponent from '../empty_states/NoResultsComponent';
import {Toolbar} from '../../components/base/Toolbar';
import {Item} from '../../../domain/base/Item';

export interface SearchScreenProps
  extends StackScreenProps<RootStackParams, 'SearchScreen'> {}

export const SearchScreen = observer(({route}: SearchScreenProps) => {
  const {searchStore} = useContext(MobXProviderContext) as {
    searchStore: SearchStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleInputChange = (value: string) => {
    searchStore.handleTermChange(value);
  };

  const handleChipChange = (newChip: number) => {
    searchStore.setSelectedChip(newChip);
  };

  useEffect(() => {
    searchStore.setSelectedChip(route.params.index);
  }, [route.params.index, searchStore]);

  useEffect(() => {
    return () => {
      searchStore.resetState();
    };
  }, [searchStore]);

  const renderItem = useCallback(
    ({item, index}: {item: Item; index: number}) => (
      <View style={itemContainer(index)}>
        <ItemRenderer item={item} navigation={navigation} />
      </View>
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Toolbar title={'Search'} />
      <SearchInput onDebounced={handleInputChange} />
      <ChipsGroup
        options={searchesOptions}
        onSelectionChange={(index, _) => handleChipChange(index)}
        defaulItemSelected={searchStore.selectedChip}
      />
      {!searchStore.isLoading ? (
        <FlashList
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={220}
          data={searchStore.result}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            <ListFooterComponent
              isLoading={searchStore.pageLoading}
              hasError={searchStore.hasError}
            />
          }
          ListEmptyComponent={<NoResultsComponent />}
          onEndReachedThreshold={0.5}
          onEndReached={() => searchStore.onReachToBottom()}
        />
      ) : (
        <VerticalFeedSkeleton isLoading={true} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  searchInput: {
    position: 'absolute',
    zIndex: 999,
  },
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
  contentContainer: {
    paddingHorizontal: 16,
  },
});
