import { memo, useCallback } from 'react';
import { FieldError } from 'react-hook-form';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { StyleProp, StyleSheet, TextInput, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { onyxColor, primaryRed } from '../../../utils/Colors';

interface Props {
  textValue: string;
  onChange: (value: string) => void;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  style?: StyleProp<ViewStyle>;
  emailError?: FieldError | undefined;
}

const EmailInput = ({
  textValue,
  onChange,
  onBlur,
  style,
  emailError,
}: Props) => {
  const onChangeText = useCallback((value: string) => {
    onChange(value);
  }, []);

  return (
    <View
      style={[
        style,
        styles.textContainer,
        emailError ? styles.textInputError : null,
      ]}
    >
      <Icon style={styles.icon} name="mail" size={18} color={'#988396'} />
      <TextInput
        value={textValue}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder="Email"
        placeholderTextColor={'#988396'}
        style={[styles.textInput]}
        autoCapitalize={'none'}
      />
    </View>
  );
};

export default memo(EmailInput);

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: onyxColor,
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
  textInputError: {
    borderWidth: 0.8,
    borderColor: primaryRed,
  },
  icon: {
    marginLeft: 16,
  },
});
