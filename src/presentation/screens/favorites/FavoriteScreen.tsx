import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UnderConstructionView} from '../empty_states/EmptyStates';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <UnderConstructionView />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
