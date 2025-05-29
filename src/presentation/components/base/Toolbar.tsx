import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Spacer, Text} from '@react-native-material/core';
import {getFontFamily} from '../../utils/Fonts';

interface Props {
  title: string;
  showBackArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 46 : 56;

export const Toolbar = ({
  title,
  showBackArrow = true,
  rightComponent,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={customStyle.row}>
      {showBackArrow && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon color={'white'} name="arrow-back-outline" size={24} />
        </TouchableOpacity>
      )}

      <Text style={customStyle.title}>{title}</Text>

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
  },
  title: {
    flex: 1,
    fontFamily: getFontFamily('bold'),
    fontSize: 20,
    color: 'white',
    marginHorizontal: 16,
  },
  spacer: {
    width: 40,
  },
  rightContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});
