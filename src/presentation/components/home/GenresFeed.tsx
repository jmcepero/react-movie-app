import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CustomGenre} from '../../../data/genre/local/CustomGenres';
import {GenreCard} from './GenreCard';

interface Props {
  genres: CustomGenre[];
}

export const GenresFeed = ({genres}: Props) => {
  return genres.length > 0 ? (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Genres</Text>
        <Text style={styles.button}>See all</Text>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        data={genres}
        renderItem={({index}) => (
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
            }}>
            <GenreCard genere={genres[index]} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 26,
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: 'rgba(251,246,248,0.7)',
  },
  button: {
    fontFamily: 'Archivo-Regular',
    fontSize: 16,
    color: '#553081',
    alignSelf: 'center',
  },
  movieTitle: {
    fontFamily: 'Archivo-Black',
    fontSize: 12,
    color: 'rgba(251,246,248,1)',
  },
  yearTitle: {
    fontFamily: 'Archivo-Thin',
    fontSize: 12,
    color: 'rgba(251,246,248,0.7)',
    marginHorizontal: 4,
  },
});
