import {View, Text} from 'react-native';
import {CardType, ImageCard} from '../MovieCard';
import {movieStyle} from './MovieItem.style';
import {fullWidth} from '../../utils/Dimen';
import {People} from '../../../domain/people/entities/People';

interface PeopleItemProps {
  people: People;
  width?: number;
  height?: number;
  onClick?: (people: People) => void;
}

const PeopleItem = ({
  people,
  width = fullWidth,
  height = 220,
  onClick,
}: PeopleItemProps) => {
  return (
    <View style={[movieStyle.movieContainer, {width: width}]}>
      <ImageCard
        imageID={{
          posterPath: people.profile_path,
        }}
        width={width}
        height={height}
        type={CardType.Feed}
        onClick={() => {
          onClick?.(people);
        }}
      />
      <View style={movieStyle.movieTitleContainer}>
        <Text
          style={movieStyle.movieTitle}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {people.name}
        </Text>
      </View>

      <Text style={movieStyle.yearTitle}>
        {people.known_for_department.toString()}
      </Text>
    </View>
  );
};

export default PeopleItem;
