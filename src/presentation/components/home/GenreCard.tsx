import {Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {CustomGenre} from '../../../data/genre/local/CustomGenres';
import {CustomImage} from '../base/CustomImage';
import {FadeInImage} from '../base/FadeImage';
import {Images} from '../../../../assets/images/Images.index';

interface Props {
  genre: CustomGenre;
  width?: number;
  height?: number;
  onClick?: (value: CustomGenre) => void;
}

export const GenreCard = ({
  genre,
  width = 160,
  height = 160,
  onClick,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onClick?.(genre)}>
      <FadeInImage
        uri={genre.image ? genre.image : ''}
        style={[styles.image, {width: width, height: height}]}
      />
      <View style={[styles.overlay, {width: width, height: height}]}></View>
      <Text style={styles.genereTitle} numberOfLines={2} ellipsizeMode="tail">
        {genre.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  genereTitle: {
    fontFamily: 'Archivo-Black',
    fontSize: 14,
    color: 'rgba(251,246,248,1)',
    position: 'absolute',
    width: 120,
    textAlign: 'center',
  },
  image: {
    borderRadius: 16,
  },
  overlay: {
    borderRadius: 16,
    backgroundColor: 'rgba(23,24,27,0.6)',
    position: 'absolute',
  },
});
