import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AccordionComponent from './component/AccordionComponent';

const MovieFilter = () => {
  // Referencia para el BottomSheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text>Expand</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}>
          <BottomSheetScrollView contentContainerStyle={{flex: 1}}>
            <AccordionComponent />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

export default MovieFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
