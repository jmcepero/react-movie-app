import {StyleSheet} from 'react-native';
import { useContext, useEffect } from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {FilterChipsStore} from '../store/FilterChipsStore';
import {RadioGroup} from './SortingRadioGroup';

const SortingComponent = () => {
  const {filterChipsStore} = useContext(MobXProviderContext) as {
    filterChipsStore: FilterChipsStore;
  };

  return (
    <RadioGroup
      options={filterChipsStore.sortingOptions}
      onSelect={value => filterChipsStore.onSortingSelect(value)}
    />
  );
};

export default observer(SortingComponent);

const styles = StyleSheet.create({});
