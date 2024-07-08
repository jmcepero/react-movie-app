import React, {useCallback, useEffect, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounceValue} from '../../hooks/useDebounceValue';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface Props {
  onDebounced: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const SearchInput = ({onDebounced, style}: Props) => {
  const {top} = useSafeAreaInsets();
  const [textValue, setTextValue] = useState('');
  const textDebounced = useDebounceValue(textValue);

  useEffect(() => {
    onDebounced(textDebounced);
  }, [onDebounced, textDebounced]);

  const onChangeText = useCallback((value: string) => {
    setTextValue(value);
  }, []);

  return (
    <View style={[style, styles.textContainer, {marginTop: top + 16}]}>
      <Icon
        style={styles.icon}
        name="search-outline"
        size={24}
        color={'#988396'}
      />
      <TextInput
        value={textValue}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor={'#988396'}
        style={[styles.textInput]}
        autoCapitalize={'none'}
      />
    </View>
  );
};

export default React.memo(SearchInput);

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
