import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {JSX, useCallback, useRef} from 'react';
import AccordionComponent from './component/AccordionComponent';
import {darkColor} from '../../utils/Colors';
import RNMovieButton from '../../components/base/RNMovieButton';
import ActionSheet, {
  ActionSheetRef,
  ScrollView,
  useScrollHandlers,
} from 'react-native-actions-sheet';

const MovieFilter = () => {
  // Referencia para el BottomSheet
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const handlers = useScrollHandlers();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={{backgroundColor: 'red', padding: 16}}>
        <Text>Expand</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        snapPoints={[70, 100]}
        containerStyle={{height: '100%', backgroundColor: darkColor}}>
        <ScrollView>
          <AccordionComponent />
        </ScrollView>
      </ActionSheet>
    </View>
  );
};

export default MovieFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  handleBottomSheet: {
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: 'rgba(24,25,32,1)',
  },
  bottomSheet: {
    backgroundColor: 'rgba(24,25,32,1)',
  },
  buttonApply: {
    margin: 16,
  },
  buttonContainer: {
    backgroundColor: 'rgba(24,25,32,1)',
  },
});
