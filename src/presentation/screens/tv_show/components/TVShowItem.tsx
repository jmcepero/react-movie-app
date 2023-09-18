import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TVShow} from '../../../../domain/tv_shows/entities/TVShows';
import {ValorationView} from '../../../components/base/ValorationView';
import {CardType, MovieCard} from '../../../components/MovieCard';

interface TVShowItemProps {
  tvShow: TVShow;
  onTVShowClicked: (tvShow: TVShow) => void;
  width?: number;
  height?: number;
}

export const TVShowItem = ({
  tvShow,
  onTVShowClicked,
  width = 160,
  height = 220,
}: TVShowItemProps) => {
  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 8,
      }}>
      <MovieCard
        imageID={{
          backdropPath: tvShow?.backdropPath,
          posterPath: tvShow.posterPath,
        }}
        width={width}
        height={height}
        type={CardType.Feed}
        onClick={() => onTVShowClicked(tvShow)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 4,
          marginTop: 8,
        }}>
        <Text
          style={[styles.movieTitle, {width: 90}]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {tvShow.name}
        </Text>
        <ValorationView average={tvShow.voteAverage} iconSize={12} />
      </View>

      <Text style={styles.yearTitle}>
        {new Date(tvShow.firstAirDate).getFullYear()}
      </Text>
    </View>
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
