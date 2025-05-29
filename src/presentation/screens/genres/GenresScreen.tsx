import {FlatList, StyleSheet, Text, View} from 'react-native';
import { useContext, useEffect } from 'react';
import {Toolbar} from '../../components/base/Toolbar';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import SquareFeedSkeleton from '../../components/base/skeleton/SquareFeedSkeleton';
import {MobXProviderContext, observer} from 'mobx-react';
import GenreStore from '../onboading/store/GenreStore';
import {GenreCard} from '../../components/home/GenreCard';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fullWidth} from '../../utils/Dimen';
import {AnimatedGenreCard} from '../../components/home/AnimatedGenreCard';

const GenresScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {genreStore} = useContext(MobXProviderContext) as {
    genreStore: GenreStore;
  };

  useEffect(() => {
    genreStore.onScreenLoaded();
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar title={'Genres'} />
      {!genreStore.isLoading ? (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
          }}
          columnWrapperStyle={{
            gap: 8,
          }}
          data={genreStore.movieGnres}
          showsVerticalScrollIndicator={false}
          renderItem={({index}) => (
            <AnimatedGenreCard
              genre={genreStore.movieGnres[index]}
              width={(fullWidth - 40) * 0.5}
              onClick={value => {
                navigation.navigate('MovieListingScreen', {
                  params: {type: 'byGenre', value: value.id.toString()},
                  title: value.name,
                });
              }}
              index={index}
            />
          )}
          numColumns={2}
          keyExtractor={(item, _) => item.id.toString()}
        />
      ) : (
        <SquareFeedSkeleton isLoading={true} />
      )}
    </View>
  );
};

export default observer(GenresScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 4,
  },
});
