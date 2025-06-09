import {StyleSheet, Text, View} from 'react-native';
import {GnresProps} from '../movie_gnres/MovieGnres';
import {observer} from 'mobx-react';
import {styles} from '../components/styles/OnBoarding.style';
import Chip from '../components/Chip';
import {skeletonDarkColor, skeletonLightColor} from '../../../utils/Colors';
import Skeleton from 'react-native-reanimated-skeleton';
import {skeletonLayouts} from '../../../components/base/skeleton/ChipSkeleton';

export const TVShowGnres = ({genreStore}: GnresProps) => {
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
          {genreStore.tvShowGenres.map(genre => (
            <Chip
              key={genre.id}
              id={genre.id.toString()}
              label={genre.name}
              isSelected={genreStore?.selectedTVShowGenres.some(
                g => g.id === genre.id,
              )}
              onSelect={() => genreStore?.toggleTVShowGenre(genre.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default observer(TVShowGnres);
