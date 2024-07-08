import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {CustomGenre} from '../../../data/genre/local/CustomGenres';
import {CustomImage} from '../base/CustomImage';

interface Props {
  genere: CustomGenre;
}

export const GenreCard = ({genere}: Props) => {
  return (
    <View>
      <CustomImage width={160} height={160} localUri={genere.image} />
      <Text style={styles.genereTitle}>{genere.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  genereTitle: {
    fontFamily: 'Archivo-Black',
    fontSize: 12,
    color: 'rgba(251,246,248,1)',
    marginHorizontal: 4,
    marginTop: 6,
  },
});
