import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {primaryRed, primaryTextColor} from '../../../utils/Colors';

interface FilterButtonProps {
  onFilterClicked: () => void;
  isFilterActive?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

const FilterButton = ({
  onFilterClicked,
  isFilterActive = false,
  customStyle,
}: FilterButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        customStyle,
        isFilterActive ? styles.filterButtonActive : undefined,
      ]}
      onPress={onFilterClicked}>
      <Icon
        style={[
          styles.iconFilterNeutral,
          isFilterActive ? styles.iconFilterActive : undefined,
        ]}
        name="options"
        size={22}
      />
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: 'rgba(24,25,32,1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: 0.6,
    borderColor: 'rgba(42,42,50,1)',
  },
  filterButtonActive: {
    borderColor: primaryRed,
  },
  iconFilterNeutral: {
    color: primaryTextColor,
  },
  iconFilterActive: {
    color: primaryRed,
  },
});
