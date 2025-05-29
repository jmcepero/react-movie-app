import {StyleSheet, Text, View} from 'react-native';
import {TVShow} from '../../../../domain/tv_shows/entities/TVShows';
import {ValorationView} from '../../../components/base/ValorationView';
import {CardType, ImageCard} from '../../../components/MovieCard';
import {fullWidth} from '../../../utils/Dimen';
import {movieStyle} from '../../../components/listing/MovieItem.style';

interface TVShowItemProps {
  tvShow: TVShow;
  onTVShowClicked: (tvShow: TVShow) => void;
  width?: number;
  height?: number;
  type?: CardType;
}

export const TVShowItem = ({
  tvShow,
  onTVShowClicked,
  width = fullWidth,
  height = 220,
  type = CardType.Feed,
}: TVShowItemProps) => {
  return (
    <View style={[movieStyle.movieContainer, {width: width}]}>
      <ImageCard
        imageID={{
          backdropPath: tvShow?.backdropPath,
          posterPath: tvShow.posterPath,
        }}
        width={width}
        height={height}
        type={type}
        onClick={() => onTVShowClicked(tvShow)}
      />
      <View style={movieStyle.movieTitleContainer}>
        <Text
          style={movieStyle.movieTitle}
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
  },
});
