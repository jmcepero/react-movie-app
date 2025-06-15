import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { Text } from '@react-native-material/core';
import { getFontFamily } from '../../utils/Fonts';
import { darkColor } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  showBackArrow?: boolean;
  onBackArrowPress?: () => void;
  rightComponent?: React.ReactNode;
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 46 : 56;

export const Toolbar = ({
  title,
  showBackArrow = true,
  rightComponent,
  onBackArrowPress,
}: Props) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackArrowPress) {
      onBackArrowPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={customStyle.row}>
      {showBackArrow && (
        <TouchableOpacity onPress={handleBackPress}>
          <Icon color={'white'} name="arrow-back-outline" size={24} />
        </TouchableOpacity>
      )}

      <Text
        style={[
          customStyle.title,
          showBackArrow ? { marginHorizontal: 16 } : undefined,
        ]}
      >
        {title}
      </Text>

      <View style={customStyle.rightContainer}>
        {rightComponent ? rightComponent : <View style={customStyle.spacer} />}
      </View>
    </View>
  );
};

const customStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: APPBAR_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: darkColor,
  },
  title: {
    flex: 1,
    fontFamily: getFontFamily('bold'),
    fontSize: 20,
    color: 'white',
  },
  spacer: {
    width: 40,
  },
  rightContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});
