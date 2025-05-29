import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ChipProps {
  label: string;
  onPress: () => void;
  isSelected: boolean;
}

const Chip = ({label, onPress, isSelected}: ChipProps) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected ? styles.selected : null]}
      onPress={onPress}>
      <Text style={[styles.chipText, isSelected ? styles.selected : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface ChipsGroupProps {
  options: {label: string}[];
  onSelectionChange: (selectedIndex: number, selectedLabel: string) => void;
  defaulItemSelected?: number;
}

const ChipsGroup: React.FC<ChipsGroupProps> = React.memo(
  ({options, onSelectionChange, defaulItemSelected}: ChipsGroupProps) => {
    const [selected, setSelected] = useState<number | null>(
      defaulItemSelected ?? null,
    );

    useEffect(() => {
      if (defaulItemSelected !== undefined && defaulItemSelected !== null) {
        setSelected(defaulItemSelected);
      }
    }, [defaulItemSelected, onSelectionChange, options]);

    const handleSelect = useCallback(
      (index: number) => {
        setSelected(index);
        onSelectionChange(index, options[index].label);
      },
      [onSelectionChange, options],
    );

    return (
      <View style={styles.container}>
        {options.map((option, index) => (
          <Chip
            key={index}
            label={option.label}
            isSelected={selected === index}
            onPress={() => handleSelect(index)}
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: '#392c3e',
    borderRadius: 12,
    fontFamily: 'Archivo-Medium',
  },
  chipText: {
    color: '#988396',
  },
  selected: {
    backgroundColor: '#392c3e',
    color: 'white',
  },
});

export default ChipsGroup;
