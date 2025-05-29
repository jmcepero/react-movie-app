import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../navigation/StackNavigation';
import {LoadingView} from '../../components/base/LoadingView';
import {YearDirector} from '../../components/detail/YearDirector';
import {CastFeed} from '../../components/detail/CastFeed';
import {TrailerCard} from '../../components/detail/TrailerCard';
import {ReviewFeed} from '../../components/detail/ReviewFeed';
import {styles} from './style/TvShow.style';
import {strDateToYear} from '../../extensions/StringDate';
import {DetailImage} from '../../components/detail/DetailImage';
import {NO_DESCRIPTION_TEXT} from '../../utils/Constants';
import {CurrentSeason} from './components/CurrentSeason';
import {MobXProviderContext, observer} from 'mobx-react';
import TvShowDetailStore from './store/TvShowDetailStore';

interface Props
  extends StackScreenProps<RootStackParams, 'TVShowDetailScreen'> {}

export const TVShowDetailScreen = observer(({route}: Props) => {
  const {tvShowStore} = useContext(MobXProviderContext) as {
    tvShowStore: TvShowDetailStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const tvShowId = route.params.tvShowId;
  const uri = `https://image.tmdb.org/t/p/original${tvShowStore.tvShow?.posterPath}`;

  useEffect(() => {
    tvShowStore.onScreenLoaded(tvShowId);
  }, [tvShowId, tvShowStore]);

  if (tvShowStore.isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          ...styles.center,
        }}>
        <LoadingView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View>
          {/* Detail image */}
          <DetailImage
            uri={uri}
            genres={tvShowStore.tvShow?.genreIds}
            onBackClicked={() => navigation.goBack()}
          />

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{tvShowStore.tvShow?.name}</Text>
            <View style={styles.valorationContainer}>
              <Text style={styles.valorationTitle}>
                {tvShowStore.tvShow?.voteAverage.toFixed(1) || 0.0}
              </Text>
              <Icon name="star" size={18} style={{color: '#dcb189'}} />
            </View>
          </View>

          {/* Year Director Section */}
          <YearDirector
            year={strDateToYear(tvShowStore.tvShow?.firstAirDate)}
            director={tvShowStore.tvShow?.director || ''}
          />

          {/* Overview Section */}
          <Text style={styles.overviewText}>
            {tvShowStore.tvShow?.overview || NO_DESCRIPTION_TEXT}
          </Text>

          {/* Season */}
          <CurrentSeason
            tvShowTitle={tvShowStore.tvShow?.name}
            season={
              tvShowStore.tvShow?.seasons !== undefined
                ? tvShowStore.tvShow.seasons[0]
                : undefined
            }
          />

          {/* Cast Section */}
          <CastFeed casts={tvShowStore.tvShow?.credits?.cast} width={100} />

          {/* Trailer Section */}
          <TrailerCard trailerUri={tvShowStore.tvShow?.trailer} />

          {/* Comment Section */}
          <ReviewFeed reviews={tvShowStore.tvShow?.reviews?.results} />
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.buttonProvider}
        onPress={() => {
          navigation.navigate('WatchProviderScreen', {
            itemId: tvShowStore.tvShow?.id,
            itemType: 'tvShow',
          });
        }}>
        <Text style={styles.buttonText}>Watch</Text>
      </TouchableOpacity>
    </View>
  );
});
