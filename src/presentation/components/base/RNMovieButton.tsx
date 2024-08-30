import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {primaryRed} from '../../utils/Colors';
import {getFontFamily} from '../../utils/Fonts';
import SpinnerLottie from './SpinnerLottie';
import {Image} from 'react-native';

interface RNMovieButtonProps {
  onClick: () => void;
  label: string;
  isLoading: boolean | undefined;
  leftIcon?: ImageSourcePropType | undefined;
  styles?: StyleProp<ViewStyle>;
}

export default function RNMovieButton({
  onClick,
  label: text,
  isLoading,
  leftIcon,
  styles,
}: RNMovieButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[localStyles.button, styles]}
      onPress={() => onClick()}>
      {isLoading !== undefined && isLoading ? (
        <SpinnerLottie />
      ) : (
        <View style={localStyles.buttonTextContainer}>
          {leftIcon && <Image source={leftIcon} style={localStyles.icon} />}
          <Text style={localStyles.buttonText}>{text}</Text>
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
    marginHorizontal: 16,
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
    padding: 16,
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
});
