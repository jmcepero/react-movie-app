import React, {useCallback, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {primaryRed} from '../../../utils/Colors';

interface Props {
  textValue: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  passwordError?: FieldError | undefined;
}

const PasswordInput = ({
  textValue,
  onChange,
  onBlur,
  style,
  passwordError,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  const onChangeText = useCallback((value: string) => {
    onChange(value);
  }, []);

  return (
    <View
      style={[
        style,
        styles.textContainer,
        passwordError ? styles.textInputError : null,
      ]}>
      <Icon
        style={styles.icon}
        name="lock-closed"
        size={18}
        color={'#988396'}
      />
      <TextInput
        value={textValue}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder="Password"
        placeholderTextColor={'#988396'}
        style={[styles.textInput]}
        autoCapitalize={'none'}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconRight}>
        <Icon
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={18}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(PasswordInput);

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
  textInputError: {
    borderWidth: 0.8,
    borderColor: primaryRed,
  },
  iconRight: {
    marginRight: 16,
  },
});
