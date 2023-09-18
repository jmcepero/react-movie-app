import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TVShow} from '../../../../domain/tv_shows/entities/TVShows';
import {TVShowItem} from './TVShowItem';

interface Props {
  title?: string;
  tvShows: TVShow[];
  onTVShowClicked: (tvShow: TVShow) => void;
  onSeeAllClicked?: () => void;
}

export const TVShowHorizontalFeed = ({
  title,
  tvShows,
  onTVShowClicked,
  onSeeAllClicked,
}: Props) => {
  return tvShows.length > 0 ? (
    <View>
      {title && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={() => onSeeAllClicked?.()}>
            <Text style={styles.button}>See all</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        data={tvShows}
        renderItem={({index}) => (
          <TVShowItem
            tvShow={tvShows[index]}
            onTVShowClicked={onTVShowClicked}
          />
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
    marginTop: 30,
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
