import { useState } from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {TVShow} from '../../../../domain/tv_shows/entities/TVShows';
import PagerIndicator from '../../../components/home/PagerIndicator';
import {TVShowCarouselItem} from './TVShowCarouselItem';
import {CarouselSkeleton} from '../../../components/base/skeleton/CarouselSkeleton';

interface Props {
  title: string;
  tvShows: TVShow[];
  isLoading: boolean;
  onTVShowClicked: (tvShow: TVShow) => void;
}

export const TVShowCarousel = ({
  title,
  tvShows,
  isLoading,
  onTVShowClicked,
}: Props) => {
  const pageWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [index, setIndex] = useState(0);

  return !isLoading ? (
    <View>
      <Text style={styles.header}>{title}</Text>

      <Carousel
        width={pageWidth}
        height={height * 0.35}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
          parallaxAdjacentItemScale: 0.8,
        }}
        data={tvShows}
        onSnapToItem={index => setIndex(index)}
        renderItem={({index}) => (
          <TVShowCarouselItem
            tvShow={tvShows[index]}
            onTvShowClicked={onTVShowClicked}
            cardWidth={pageWidth}
          />
        )}
      />

      <PagerIndicator currentPage={index} numPages={tvShows.length} />
    </View>
  ) : (
    <CarouselSkeleton isLoading={isLoading} />
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: 'rgba(251,246,248,0.7)',
    marginHorizontal: 18,
    top: 4,
  },
  title: {
    marginVertical: 4,
    fontFamily: 'Archivo-Black',
    fontSize: 16,
    color: 'rgba(251,246,248,0.7)',
    textAlign: 'center',
  },
});
