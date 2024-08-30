import React, {useCallback} from 'react';
import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import _Icon from 'react-native-vector-icons/Ionicons';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface Props {
  textValue: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const NameInput = ({textValue, onChange, style}: Props) => {
  const Icon = _Icon as React.ElementType;

  const onChangeText = useCallback((value: string) => {
    onChange(value);
  }, []);

  return (
    <View style={[style, styles.textContainer]}>
      <Icon style={styles.icon} name="person" size={18} color={'#988396'} />
      <TextInput
        value={textValue}
        onChangeText={onChangeText}
        placeholder="Name"
        placeholderTextColor={'#988396'}
        style={[styles.textInput]}
        autoCapitalize={'none'}
      />
    </View>
  );
};

export default React.memo(NameInput);

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#392c3e',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 16,
  },
  textInput: {
    padding: 16,
    flex: 1,
    color: 'white',
    fontFamily: 'Archivo-Medium',
  },
  icon: {
    marginLeft: 16,
  },
});
