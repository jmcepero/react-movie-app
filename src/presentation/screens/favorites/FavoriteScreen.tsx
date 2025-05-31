import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UnderConstructionComponent from '../empty_states/UnderConstructionComponent';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <UnderConstructionComponent />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
