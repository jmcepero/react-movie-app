import React, {useContext, useEffect} from 'react';
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

  return (
    <View style={styles.container}>
      <SearchInput onDebounced={handleInputChange} />
      <ChipsGroup
        options={searchesOptions}
        onSelectionChange={(index, _) => handleChipChange(index)}
        defaulItemSelected={searchStore.selectedChip}
      />
      {!searchStore.isLoading ? (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          data={searchStore.result}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <ItemRenderer
              item={searchStore.result[index]}
              navigation={navigation}
            />
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <ListFooterComponent
              isLoading={searchStore.pageLoading || searchStore.isLoading}
              hasError={searchStore.error.length > 0}
            />
          }
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onEndReached={() => {
            searchStore.onReachToBottom();
          }}
        />
      ) : (
        <VerticalFeedSkeleton isLoading={true} />
      )}
    </View>
  );
});

/*
<FlatList
        data={result}
        showsVerticalScrollIndicator={false}
        renderItem={({index}) => (
          <ItemRenderer item={result[index]} navigation={navigation} />
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <ListFooterComponent
            isLoading={pageLoading || isLoading}
            hasError={error.length > 0}
          />
        }
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        onEndReached={() => {
          onReachToEnd();
        }}
      />
*/

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
});
