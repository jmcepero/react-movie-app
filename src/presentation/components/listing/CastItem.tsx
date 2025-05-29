import {View, Text} from 'react-native';
import {strDateToYear} from '../../extensions/StringDate';
import {ValorationView} from '../base/ValorationView';
import {ImageCard} from '../MovieCard';
import {movieStyle} from './MovieItem.style';
import {fullWidth} from '../../utils/Dimen';
import {Cast} from '../../../data/people/entities/PeopleInterfaces';
import {CardType} from './MovieItem';

interface CastItemProps {
  cast: Cast;
  width?: number;
  height?: number;
  onClick?: (cast: Cast) => void;
  type?: CardType;
}

const CastItem = ({
  cast,
  width = fullWidth,
  height = 220,
  onClick,
  type = CardType.Feed,
}: CastItemProps) => {
  console.log(cast);
  return (
    <View style={[movieStyle.movieContainer, {width: width}]}>
      <ImageCard
        imageID={{
          backdropPath: cast.backdrop_path,
          posterPath: cast.poster_path,
        }}
        width={width}
        height={height}
        type={type}
        onClick={() => {
          onClick?.(cast);
        }}
      />
      <View style={movieStyle.movieTitleContainer}>
        <Text
          style={movieStyle.movieTitle}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {cast.title ? cast.title : cast.name}
        </Text>
        <ValorationView average={cast.vote_average} iconSize={12} />
      </View>
      <Text style={movieStyle.yearTitle}>
        {strDateToYear(
          cast.release_date ? cast.release_date : cast.first_air_date,
        )}
      </Text>
    </View>
  );
};

export default CastItem;
