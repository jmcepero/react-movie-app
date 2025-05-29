import React from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import FilterChipsComponent from '../FilterChipsComponent';
import {movieFilterStyles} from '../../styles/MovieFilterScreenStyles';

export const FiltersTab = () => (
  <BottomSheetScrollView contentContainerStyle={movieFilterStyles.contentContainer}>
    <FilterChipsComponent />
  </BottomSheetScrollView>
);