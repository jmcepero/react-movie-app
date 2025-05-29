import {StyleSheet, ViewStyle} from 'react-native';
import {darkColor, secondaryTextColor} from '../../../utils/Colors';

export const movieFilterStyles = StyleSheet.create({
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
  contentContainer: {
    paddingTop: 8,
    paddingBottom: 120,
  },
  buttonContainer: {
    backgroundColor: 'rgba(24,25,32,1)',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: darkColor,
    borderTopWidth: 1,
    borderTopColor: '#ffffff30',
    gap: 8,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterButton: {
    paddingHorizontal: 12,
    height: 32,
    marginEnd: 8,
    borderRadius: 8,
  },
  resetFilterText: {
    color: secondaryTextColor,
  },
});

export const listStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
});

export const itemContainer = (index: number): ViewStyle => ({
  marginRight: index % 2 === 0 ? 'auto' : undefined,
  marginLeft: index % 2 === 1 ? 'auto' : undefined,
});
