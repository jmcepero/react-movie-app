import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import Icon from 'react-native-vector-icons/Ionicons';
import {skeletonDarkColor, skeletonLightColor} from '../../utils/Colors';
import {getFontFamily} from '../../utils/Fonts';

interface Props {
  onClick: () => void;
  isLoading: boolean;
}

export const SearchBar = ({onClick, isLoading}: Props) => {
  return !isLoading ? (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Icon style={styles.icon} name="search-outline" size={22} />
      <Text style={styles.text}>Search</Text>
    </TouchableOpacity>
  ) : (
    <View>
      <Skeleton
        containerStyle={{flex: 1, marginHorizontal: 16}}
        isLoading={isLoading}
        layout={[
          {
            key: 'search',
            flex: 1,
            width: '100%',
            height: 48,
            borderRadius: 16,
          },
        ]}
        boneColor={skeletonDarkColor}
        highlightColor={skeletonLightColor}
        duration={2000}
      />
    </View>
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
    fontFamily: getFontFamily('normal'),
    fontSize: 14,
    color: '#988396',
    marginHorizontal: 8,
  },
});
