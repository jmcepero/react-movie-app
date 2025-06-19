import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TVShow } from '../../../../domain/tv_shows/entities/TVShows';
import { ValorationView } from '../../../components/base/ValorationView';
import { CardType, ImageCard } from '../../../components/MovieCard';
import { fullWidth } from '../../../utils/Dimen';
import { movieStyle } from '../../../components/listing/MovieItem.style';
import { useContext } from 'react';
import { FavoritesStore } from '@presentation/screens/favorites/store/FavoritesStore';
import { MobXProviderContext, observer } from 'mobx-react';
import Icon from '@react-native-vector-icons/ionicons';
import { primaryRed } from '@presentation/utils/Colors';

interface TVShowItemProps {
  tvShow: TVShow;
  onTVShowClicked: (tvShow: TVShow) => void;
  width?: number;
  height?: number;
  type?: CardType;
}

const TVShowItem = ({
  tvShow,
  onTVShowClicked,
  width = fullWidth,
  height = 220,
  type = CardType.Feed,
}: TVShowItemProps) => {
  const { favoritesStore } = useContext(MobXProviderContext) as {
    favoritesStore: FavoritesStore;
  };

  const isFavorite = favoritesStore.isFavorite(tvShow.id, 'tv');
  const handleToggleFavorite = () => {
    favoritesStore.toggleFavorite(tvShow.id, 'tv');
  };

  return (
    <View style={[movieStyle.movieContainer, { width: width }]}>
      <ImageCard
        itemId={tvShow.id.toString()}
        imageID={{
          backdropPath: tvShow?.backdropPath,
          posterPath: tvShow.posterPath,
        }}
        width={width}
        height={height}
        type={type}
        onClick={() => onTVShowClicked(tvShow)}
      />

      <TouchableOpacity
        style={movieStyle.iconFavContainer}
        onPress={handleToggleFavorite}
        activeOpacity={0.9}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          color={isFavorite ? primaryRed : 'white'}
          size={22}
        />
      </TouchableOpacity>

      <View style={movieStyle.movieTitleContainer}>
        <Text
          style={movieStyle.movieTitle}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
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

export default observer(TVShowItem);

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
