import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TVShow } from '../../../../domain/tv_shows/entities/TVShows';
import TVShowItem from './TVShowItem';
import { fullWidth } from '../../../utils/Dimen';
import HorizontalFeedSkeleton from '../../../components/base/skeleton/HorizontalFeedSkeleton';
import { getFontFamily } from '../../../utils/Fonts';
import { primaryRed } from '../../../utils/Colors';

interface Props {
  title?: string;
  tvShows: TVShow[];
  onTVShowClicked: (tvShow: TVShow) => void;
  onSeeAllClicked?: () => void;
  isLoading: boolean;
}

export const TVShowHorizontalFeed = ({
  title,
  tvShows,
  onTVShowClicked,
  onSeeAllClicked,
  isLoading,
}: Props) => {
  return !isLoading ? (
    <View>
      {title && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={() => onSeeAllClicked?.()}>
            <Text style={styles.button}>See all</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
        }}
        data={tvShows}
        renderItem={({ index }) => (
          <TVShowItem
            tvShow={tvShows[index]}
            onTVShowClicked={onTVShowClicked}
            width={fullWidth * 0.42}
            height={220}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : (
    <HorizontalFeedSkeleton isLoading={isLoading} />
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
    fontFamily: getFontFamily('normal'),
    fontSize: 18,
    color: 'rgba(251,246,248,0.7)',
  },
  button: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: primaryRed,
    alignSelf: 'center',
  },
  movieTitle: {
    fontFamily: getFontFamily('bold'),
    fontSize: 12,
    color: 'rgba(251,246,248,1)',
  },
  yearTitle: {
    fontFamily: getFontFamily('thin'),
    fontSize: 12,
    color: 'rgba(251,246,248,0.7)',
    marginHorizontal: 4,
  },
});
