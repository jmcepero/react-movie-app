import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Spacer, Text} from '@react-native-material/core';
import {getFontFamily} from '../../utils/Fonts';

interface Props {
  title: string;
  showBackArrow?: boolean;
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const Toolbar = ({title, showBackArrow = true}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={customStyle.row}>
      {showBackArrow && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={customStyle.button}>
          <Icon color={'white'} name="arrow-back-outline" size={24} />
        </TouchableOpacity>
      )}
      <Text style={customStyle.title}>{title}</Text>
      <View
        style={{
          width: 40,
        }}
      />
    </View>
  );
};

const customStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: APPBAR_HEIGHT,
  },
  button: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontFamily: getFontFamily('bold'),
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    marginHorizontal: 16,
  },
});
