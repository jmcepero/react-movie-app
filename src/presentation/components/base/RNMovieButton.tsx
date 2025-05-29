import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {primaryRed, secondaryButtonColor} from '../../utils/Colors';
import {getFontFamily} from '../../utils/Fonts';
import SpinnerLottie from './SpinnerLottie';
import {Image} from 'react-native';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text',
}

interface RNMovieButtonProps {
  onClick: () => void;
  label: string;
  isLoading?: boolean;
  leftIcon?: ImageSourcePropType | undefined;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  type?: ButtonType;
}

export default function RNMovieButton({
  onClick,
  label: text,
  isLoading,
  leftIcon,
  style,
  textStyle,
  disabled,
  type = ButtonType.PRIMARY,
}: RNMovieButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        localStyles.button,
        style,
        disabled && localStyles.buttonDisable,
        localStyles[`${type}Button`],
      ]}
      onPress={() => onClick()}
      disabled={disabled}>
      {isLoading !== undefined && isLoading ? (
        <SpinnerLottie />
      ) : (
        <View style={localStyles.buttonTextContainer}>
          {leftIcon && <Image source={leftIcon} style={localStyles.icon} />}
          <Text style={[localStyles.buttonText, textStyle]}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: primaryRed,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: getFontFamily('medium'),
    fontSize: 18,
    color: 'white',
    marginHorizontal: 12,
    textAlign: 'center',
  },
  buttonTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
  },
  buttonDisable: {
    backgroundColor: 'gray',
  },
  primaryButton: {
    backgroundColor: primaryRed,
  },
  secondaryButton: {
    backgroundColor: secondaryButtonColor,
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
