import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onClick: () => void;
}

export const SearchBar = ({onClick}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Icon style={styles.icon} name="search-outline" size={22} />
      <Text style={styles.text}>Search</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#382c3e',
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  icon: {
    color: '#988396',
  },
  text: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: '#988396',
    marginHorizontal: 8,
  },
});
