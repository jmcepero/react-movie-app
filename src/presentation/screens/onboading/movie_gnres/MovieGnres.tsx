import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import GenreStore from '../store/GenreStore';
import Chip from '../components/Chip';
import {observer} from 'mobx-react';
import Skeleton from 'react-native-reanimated-skeleton';
import {skeletonDarkColor, skeletonLightColor} from '../../../utils/Colors';
import {styles} from '../components/styles/OnBoarding.style';
import {skeletonLayouts} from '../../../components/base/skeleton/ChipSkeleton';

export interface GnresProps {
  genreStore: GenreStore;
}

const MovieGnres = ({genreStore}: GnresProps) => {
  return (
    <View style={styles.container}>
      {genreStore.isLoading ? (
        <View style={styles.chipContainer}>
          <Skeleton
            containerStyle={styles.skeleton}
            isLoading={true}
            layout={skeletonLayouts}
            boneColor={skeletonDarkColor}
            highlightColor={skeletonLightColor}
            duration={2000}
          />
        </View>
      ) : (
        <View style={styles.chipContainer}>
          {genreStore.movieGnres.map(genre => (
            <Chip
              key={genre.id}
              id={genre.id.toString()}
              label={genre.name}
              isSelected={genreStore?.selectedMovieGenres.some(
                g => g.id === genre.id,
              )}
              onSelect={() => genreStore?.toggleMovieGenre(genre.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default observer(MovieGnres);
