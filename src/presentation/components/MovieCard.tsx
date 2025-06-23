import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FadeInImage } from './base/FadeImage';
import Icon from '@react-native-vector-icons/ionicons';
import { Image } from 'expo-image';

export enum CardType {
  Carousel,
  Feed,
}

interface Props {
  itemId: string;
  imageID: {
    backdropPath?: string;
    posterPath?: string;
  };
  width?: number;
  height?: number;
  onClick?: () => void;
  type?: CardType;
}

export const ImageCard = ({
  itemId,
  imageID,
  width,
  height,
  onClick,
  type = CardType.Carousel,
}: Props) => {
  const uri = `https://image.tmdb.org/t/p/${
    type === CardType.Carousel
      ? 'original' + imageID.backdropPath
      : 'w500' + imageID.posterPath
  }`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onClick?.()}
      style={styles.container}
    >
      <View
        style={{
          ...styles.imageContainer,
          width: width,
          height: height,
        }}
      >
        <Image
          transition={500}
          source={uri}
          style={styles.image}
          id={itemId}
          contentFit="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#2B2533',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 15,
  },
});
