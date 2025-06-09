import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {Toolbar} from '../../components/base/Toolbar';
import {getFontFamily} from '../../utils/Fonts';
import {MobXProviderContext, observer} from 'mobx-react';
import GenreStore from './store/GenreStore';
import {Route, TabView} from 'react-native-tab-view';
import MovieGnres from './movie_gnres/MovieGnres';
import TVShowGnres from './tv_show_gnres/TVShowGnres';
import RNMovieButton, {ButtonType} from '../../components/base/RNMovieButton';
import AuthStore from '../auth/store/AuthStore';
import {primaryBlackColor, secondaryBackgroundColor} from '../../utils/Colors';
import {CustomTabBarRendererProps, renderTabBar} from './components/CustomTab';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const SetGnresPreferencesScreen = () => {
  const layout = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();
  const {genreStore, authStore} = useContext(MobXProviderContext) as {
    genreStore: GenreStore;
    authStore: AuthStore;
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'movie', title: 'Movie Genres'},
    {key: 'tvShow', title: 'Tv Show Genres'},
  ]);

  const renderScene = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'movie':
        return <MovieGnres genreStore={genreStore} />;
      case 'tvShow':
        return <TVShowGnres genreStore={genreStore} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    genreStore.onScreenLoaded();
  }, []);

  useEffect(() => {
    if (genreStore.error) {
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: genreStore.error,
        visibilityTime: 6000,
        bottomOffset: bottom + 90,
        position: 'bottom',
        onHide: () => {
          genreStore.onErrorHide();
        },
      });
    }
  }, [genreStore.error]);

  const handleContinueSuccess = (success: boolean) => {
    if (success) {
      authStore.setIsOnBoardingComplete(true);
    }
  };

  return (
    <View style={styles.container}>
      <Toolbar title={'Choose your interest'} showBackArrow={false} />
      <Text style={styles.descriptionText}>
        Choose your interests and get the best movie and TV shows
        recommendations. Don't worry, you can always change it later
      </Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={{backgroundColor: secondaryBackgroundColor, marginTop: 16}}
        renderTabBar={props => renderTabBar(props as CustomTabBarRendererProps)}
      />
      <View style={[styles.buttonContainer, {bottom}]}>
        <RNMovieButton
          onClick={() => {}}
          label="Skip"
          type={ButtonType.SECONDARY}
          style={styles.container}
        />
        <RNMovieButton
          onClick={() =>
            genreStore.onContinueButtonClicked('.', handleContinueSuccess)
          }
          label="Continue"
          style={styles.container}
          enabled={genreStore.canContinue}
          isLoading={genreStore.saveLoading}
        />
      </View>
    </View>
  );
};

export default observer(SetGnresPreferencesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionText: {
    fontFamily: getFontFamily('normal'),
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    padding: 16,
    flexDirection: 'row',
    gap: 6,
    backgroundColor: primaryBlackColor,
  },
});
