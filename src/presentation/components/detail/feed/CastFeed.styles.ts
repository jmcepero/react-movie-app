import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../utils/Fonts';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  headerText: {
    paddingHorizontal: 16,
    fontFamily: getFontFamily('medium'),
    fontSize: 20,
    color: '#fbf6f8',
    marginTop: 8,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});
