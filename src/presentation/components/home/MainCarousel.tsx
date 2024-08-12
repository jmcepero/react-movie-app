import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Movie} from '../../../domain/movie/entities/Movies';
import PagerIndicator from './PagerIndicator';
import {MainCorouselItem} from './MainCorouselItem';
import {CarouselSkeleton} from '../base/skeleton/CarouselSkeleton';

interface Props {
  movies: Movie[];
  isLoading: boolean;
  onMovieClicked: (movie: Movie) => void;
}

export const MainCarousel = ({movies, isLoading, onMovieClicked}: Props) => {
  const pageWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [currentIndex, setIndex] = useState(0);

  return !isLoading ? (
    <View>
      <Text style={styles.title}>Now Playing</Text>

      <Carousel
        width={pageWidth}
        height={height * 0.35}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
          parallaxAdjacentItemScale: 0.8,
        }}
        data={movies}
        onSnapToItem={index => setIndex(index)}
        renderItem={({index}) => (
          <MainCorouselItem
            movie={movies[index]}
            onMovieClicked={onMovieClicked}
            cardWidth={pageWidth}
          />
        )}
      />

      <PagerIndicator currentPage={currentIndex} numPages={movies.length} />
    </View>
  ) : (
    <CarouselSkeleton isLoading={isLoading} />
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: 'rgba(251,246,248,0.7)',
    marginHorizontal: 18,
    top: 4,
  },
});
