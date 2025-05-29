import {Dimensions, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton} from '../base/BackButton';
import {GenreChips} from '../base/GenreChips';
import {BaseGenres} from '../../../domain/tv_shows/entities/TVShows';
import {detailImageStyle} from './DetailImage.style';

const height = Dimensions.get('window').height;
interface DetailImageProps {
  uri: string;
  genres?: BaseGenres[];
  onBackClicked: () => void;
}

export const DetailImage = ({uri, genres, onBackClicked}: DetailImageProps) => {
  return (
    <View
      style={{
        height: height * 0.62,
      }}>
      <Image source={{uri}} style={detailImageStyle.image} />
      <LinearGradient
        style={detailImageStyle.gradient}
        colors={['transparent', 'rgba(23, 24, 27, 1)']}
        locations={[0.5, 0.9]}
      />
      <BackButton onClicked={onBackClicked} />

      {/* Genere Sections */}
      <GenreChips
        genres={genres}
        customStyle={{
          position: 'absolute',
        }}
      />
    </View>
  );
};
