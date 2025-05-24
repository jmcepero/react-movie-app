import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {sortingValues} from '../utils/SortingData';
import {darkColor, primaryRed, primaryTextColor} from '../../../utils/Colors';
import {getFontFamily} from '../../../utils/Fonts';

interface RadioButtonProps {
  isSelected: boolean;
  label: string;
  onPress: () => void;
}

const RadioButton = ({isSelected, label, onPress}: RadioButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={styles.radioButtonContainer}>
    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
      {isSelected && <View style={styles.radioInner} />}
    </View>
    <Text style={[styles.label, isSelected && styles.labelSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface SortingRadioGroupProps {
  options: typeof sortingValues;
  onSelect: (value: string) => void;
}

export const RadioGroup = ({options, onSelect}: SortingRadioGroupProps) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <RadioButton
          key={option.id}
          isSelected={option.isSelected}
          label={option.label}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: primaryRed,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: primaryRed, // Mismo color que el borde
  },
  label: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: primaryTextColor,
  },
  labelSelected: {
    fontFamily: getFontFamily('medium'),
    color: primaryRed,
  },
});
