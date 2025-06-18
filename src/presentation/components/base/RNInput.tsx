import { memo, useCallback, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { FieldError } from 'react-hook-form';
import { onyxColor, primaryRed } from '../../utils/Colors';
import { getFontFamily } from '../../utils/Fonts';

interface Props {
  textValue: string;
  onChange: (value: string) => void;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  style?: StyleProp<ViewStyle>;
  error?: FieldError | undefined;
  placeholder: string;
  secureTextEntry?: boolean; // Para manejar inputs de contraseña
  iconName: React.ComponentProps<typeof Icon>['name']; // Nombre del ícono a usar
  iconColor?: string; // Color del ícono
  placeholderTextColor?: string; // Color del placeholder
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // Control de auto-capitalización
}

const RNInput = ({
  textValue,
  onChange,
  onBlur,
  style,
  error,
  placeholder,
  secureTextEntry = false,
  iconName = 'person',
  iconColor = '#988396',
  placeholderTextColor = '#988396',
  autoCapitalize = 'none',
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  const onChangeText = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <View
      style={[
        styles.textContainer,
        style,
        error ? styles.textInputError : null,
      ]}
    >
      <Icon style={styles.icon} name={iconName} size={18} color={iconColor} />
      <TextInput
        value={textValue}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry ? !isPasswordVisible : undefined}
        autoCapitalize={autoCapitalize}
        style={[styles.textInput]}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconRight}
        >
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={18}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(RNInput);

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: onyxColor, // Cambiado a un color genérico, reemplaza según tu tema
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
    fontFamily: getFontFamily('medium'),
  },
  textInputError: {
    borderWidth: 0.8,
    borderColor: primaryRed,
  },
  icon: {
    marginLeft: 16,
  },
  iconRight: {
    marginRight: 16,
  },
});
