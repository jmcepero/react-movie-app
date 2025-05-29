import { useState, useCallback } from 'react';
import * as React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {movieFilterStyles} from '../styles/MovieFilterScreenStyles';
import RNMovieButton, {
  ButtonType,
} from '../../../components/base/RNMovieButton';
import {darkColor} from '../../../utils/Colors';
import {FiltersTab} from './tabs/FiltersTab';
import {SortingTab} from './tabs/SortingTab';

interface FilterBottomSheetProps {
  onDismiss: () => void;
  onApply: () => void;
  onReset: () => void;
  isFilterActive: boolean;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}

export const FilterBottomSheet = ({
  onDismiss,
  onApply,
  onReset,
  isFilterActive,
  bottomSheetModalRef,
}: FilterBottomSheetProps) => {
  const snapPoints = ['70%', '90%'];
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    {key: 'filters', title: 'Filter'},
    {key: 'sorting', title: 'Sort'},
  ]);

  // Backdrop para cerrar al tocar fuera
  const renderBackdrop = useCallback(
    (props: any) => (
      <TouchableWithoutFeedback
        onPress={() => bottomSheetModalRef.current?.dismiss()}
        style={movieFilterStyles.absoluteFill}>
        <View {...props} style={[props.style, movieFilterStyles.backdrop]} />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  // Footer con botones
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props}>
        <View style={movieFilterStyles.footer}>
          <RNMovieButton
            onClick={() => {
              onApply();
              bottomSheetModalRef.current?.dismiss();
            }}
            label="Apply"
          />
          {isFilterActive && (
            <RNMovieButton
              onClick={() => {
                onReset();
                bottomSheetModalRef.current?.dismiss();
              }}
              textStyle={movieFilterStyles.resetFilterText}
              type={ButtonType.TEXT}
              label="Reset"
            />
          )}
        </View>
      </BottomSheetFooter>
    ),
    [isFilterActive, onApply, onReset],
  );

  const renderScene = SceneMap({
    filters: FiltersTab,
    sorting: SortingTab,
  });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
      backgroundStyle={{backgroundColor: darkColor}}
      handleIndicatorStyle={{backgroundColor: 'white'}}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}>
      <TabView
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'white'}}
            style={{backgroundColor: darkColor}}
          />
        )}
      />
    </BottomSheetModal>
  );
};
