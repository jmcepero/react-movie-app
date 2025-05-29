import React from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import SortingComponent from '../SortingComponent';
import {movieFilterStyles} from '../../styles/MovieFilterScreenStyles';

export const SortingTab = () => (
  <BottomSheetScrollView contentContainerStyle={movieFilterStyles.contentContainer}>
    <SortingComponent />
  </BottomSheetScrollView>
);