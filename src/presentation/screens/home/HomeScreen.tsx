import { useContext, useEffect } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomToolbar from '@components/home/CustomToolbar';
import { GenresFeed } from '@components/home/GenresFeed';
import { MainCarousel } from '@components/home/MainCarousel';
import { HorizontalFeed } from '@components/HorizontalFeed';
import { SearchBar } from '@components/home/SearchBar';
import { Snackbar } from '@react-native-material/core';
import { RefreshControl } from 'react-native-gesture-handler';
import MovieStore from './store/MovieStore';
import { styles } from './styles/HomeScreen.style';
import { movieOption } from '@utils/Constants';
import { MobXProviderContext, observer } from 'mobx-react';
import AuthStore from '@screens/auth/store/AuthStore';
import { primaryRed } from '@utils/Colors';
import { TMDBModalOrchestrator } from '@presentation/components/base/TMDBModalOrchestrator';
import { ScrollAnimationContext } from '@presentation/utils/ScrollAnimationContext';

export const HomeScreen = observer(() => {
  const { scrollY } = useContext(ScrollAnimationContext);
  const { authStore, movieStore } = useContext(MobXProviderContext) as {
    authStore: AuthStore;
    movieStore: MovieStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const refreshData = async () => {
    movieStore.reloadData(authStore.user?.uid);
  };

  useEffect(() => {
    if (authStore.user) refreshData();
  }, [authStore.user, movieStore]);

  return (
    <TMDBModalOrchestrator>
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refreshData}
              tintColor={primaryRed}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
        >
          <View>
            {/* Toolbar Section */}
            <CustomToolbar
              title="Movies"
              userPhoto={authStore.user?.photoURL}
              onUserIconClicked={() => {
                navigation.navigate('AccountScreen');
              }}
            />

            {/* Search Section */}
            <SearchBar
              onClick={() => navigation.navigate('SearchScreen', movieOption)}
              onFilterClicked={() => {
                navigation.navigate('MovieFilter');
              }}
              isLoading={movieStore.isLoading}
            />

            {/* Main Corousel */}
            <MainCarousel
              movies={movieStore.nowPlaying}
              isLoading={movieStore.isLoading}
              onMovieClicked={movie =>
                navigation.navigate('DetailScreen', { movieId: movie.id })
              }
            />

            {/* Popular */}
            <HorizontalFeed
              title="Popular"
              movies={movieStore.popular}
              onMovieClicked={movie =>
                navigation.navigate('DetailScreen', { movieId: movie.id })
              }
              onSeeAllClicked={() =>
                navigation.navigate('MovieListingScreen', {
                  listType: 'popular',
                  title: 'Popular',
                })
              }
              isLoading={movieStore.isLoading}
            />

            {/* Generes */}
            <GenresFeed
              genres={movieStore.genres}
              isLoading={movieStore.isLoading}
              onClick={value => {
                navigation.navigate('MovieFilter', {
                  genre: value.id,
                });
              }}
              onSeeAllClicked={() => {
                navigation.navigate('GenresScreen');
              }}
            />

            <HorizontalFeed
              title="For you"
              movies={movieStore.byInterest}
              onMovieClicked={movie =>
                navigation.navigate('DetailScreen', { movieId: movie.id })
              }
              onSeeAllClicked={() => {}}
              isLoading={movieStore.isLoading}
            />

            {/* Upcoming */}
            <HorizontalFeed
              title="Upcoming"
              movies={movieStore.upcoming}
              onMovieClicked={movie =>
                navigation.navigate('DetailScreen', { movieId: movie.id })
              }
              onSeeAllClicked={() =>
                navigation.navigate('MovieListingScreen', {
                  listType: 'topRated',
                  title: 'Top Rated',
                })
              }
              isLoading={movieStore.isLoading}
            />

            {/* Top Rated */}
            <HorizontalFeed
              title="Top Rated"
              movies={movieStore.topRated}
              onMovieClicked={movie =>
                navigation.navigate('DetailScreen', { movieId: movie.id })
              }
              onSeeAllClicked={() =>
                navigation.navigate('MovieListingScreen', {
                  listType: 'upcoming',
                  title: 'Upcoming',
                })
              }
              isLoading={movieStore.isLoading}
            />
          </View>
        </Animated.ScrollView>

        {movieStore.error && (
          <Snackbar message={movieStore.error} style={styles.toast} />
        )}
      </View>
    </TMDBModalOrchestrator>
  );
});
