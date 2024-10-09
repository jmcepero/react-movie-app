import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Toolbar} from '../../components/base/Toolbar';
import {getFontFamily} from '../../utils/Fonts';
import {MobXProviderContext, observer} from 'mobx-react';
import GenreStore from './store/GenreStore';
import {Route, TabBar, TabView} from 'react-native-tab-view';
import MovieGnres from './movie_gnres/MovieGnres';
import TVShowGnres from './tv_show_gnres/TVShowGnres';
import RNMovieButton from '../../components/base/RNMovieButton';
import AuthStore from '../auth/store/AuthStore';
import {darkColor, secondaryBackgroundColor} from '../../utils/Colors';

const SetGnresPreferences = observer(() => {
  const layout = useWindowDimensions();
  const {genreStore, authStore} = useContext(MobXProviderContext) as {
    genreStore: GenreStore;
    authStore: AuthStore;
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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

  const handleOnFinish = () => {
    authStore.setIsOnBoardingComplete(true);
  };

  useEffect(() => {
    genreStore.onScreenLoaded();
  }, [genreStore]);

  return (
    <View style={styles.container}>
      <Toolbar title={'Choose your interest'} showBackArrow={true} />
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
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'white'}}
            style={{
              backgroundColor: darkColor,
              height: 40,
            }}
            renderLabel={({route, focused, color}) => (
              <Text
                key={route.key}
                style={{
                  color,
                  bottom: 4,
                  fontFamily: getFontFamily('bold'),
                  fontSize: 12,
                  textTransform: 'uppercase',
                }}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <RNMovieButton
          onClick={() => {}}
          label="Skip"
          secondary
          styles={styles.container}
        />
        <RNMovieButton
          onClick={() =>
            genreStore.onContinueButtonClicked(
              authStore.user?.uid,
              handleOnFinish,
            )
          }
          label="Continue"
          styles={styles.container}
          disabled={!genreStore.canContinue}
        />
      </View>
    </View>
  );
});

export default SetGnresPreferences;

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
    backgroundColor: darkColor,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(12,15,22,1)',
  },
});
