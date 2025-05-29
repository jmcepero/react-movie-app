import {View, Text} from 'react-native';
import {Movie} from '../../../domain/movie/entities/Movies';
import {strDateToYear} from '../../extensions/StringDate';
import {ValorationView} from '../base/ValorationView';
import {ImageCard} from '../MovieCard';
import {movieStyle} from './MovieItem.style';
import {fullWidth} from '../../utils/Dimen';

export enum CardType {
  Carousel,
  Feed,
}

interface MovieItemProps {
  movie: Movie;
  width?: number;
  height?: number;
  onClick?: (movie: Movie) => void;
  type?: CardType;
}

const MovieItem = ({
  movie,
  width = fullWidth,
  height = 220,
  onClick,
  type = CardType.Feed,
}: MovieItemProps) => {
  return (
    <View
      style={[movieStyle.movieContainer, {width: width}]}
      key={`MovieItem_${movie.id.toString()}`}>
      <ImageCard
        itemId={movie.id.toString()}
        imageID={{
          backdropPath: movie.backdropPath,
          posterPath: movie.posterPath,
        }}
        width={width}
        height={height}
        type={type}
        onClick={() => {
          onClick?.(movie);
        }}
      />
      <View style={movieStyle.movieTitleContainer}>
        <Text
          key={`MovieTitle_${movie.id.toString()}`}
          style={movieStyle.movieTitle}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {movie.title}
        </Text>
        <ValorationView average={movie.voteAverage} iconSize={12} />
      </View>

      <Text
        style={movieStyle.yearTitle}
        key={`MovieYear_${movie.id.toString()}`}>
        {strDateToYear(movie.releaseDate)}
      </Text>
    </View>
  );
};

export default MovieItem;
