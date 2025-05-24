// components/Chip.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {primaryRed, secondaryTextColor} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';

interface ChipProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const Chip: React.FC<ChipProps> = ({id, label, isSelected, onSelect}) => (
  <TouchableOpacity
    style={[styles.chip, isSelected ? styles.selected : null]}
    onPress={() => onSelect(id)}>
    <Text style={[styles.label, isSelected ? styles.labelSelected : null]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  label: {
    fontFamily: getFontFamily('normal'),
    color: secondaryTextColor,
    fontSize: 16,
  },
  labelSelected: {
    color: 'white',
  },
  chip: {
    margin: 4,
    height: 32,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: secondaryTextColor,
    borderRadius: 20,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: primaryRed,
    borderColor: primaryRed,
  },
});

export default Chip;
