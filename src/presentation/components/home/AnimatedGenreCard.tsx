import { StyleSheet } from 'react-native';
import { CustomGenre } from '../../../data/genre/local/CustomGenres';
import { MotiView } from 'moti';
import { GenreCard } from './GenreCard';

interface Props {
  genre: CustomGenre;
  width?: number;
  height?: number;
  onClick?: (value: CustomGenre) => void;
  index: number;
}

export const AnimatedGenreCard = ({
  genre,
  width = 160,
  height = 160,
  onClick,
  index,
}: Props) => {
  const delay = index * 100;
  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300, delay }}
      style={{ width: width, height: height }}
    >
      <GenreCard
        genre={genre}
        width={width}
        height={height}
        onClick={onClick}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({});
