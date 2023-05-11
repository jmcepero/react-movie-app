import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../../navigation/StackNavigation';
import { LoadingView } from '../../components/base/LoadingView';
import { YearDirector } from '../../components/detail/YearDirector';
import { CastFeed } from '../../components/detail/CastFeed';
import { TrailerCard } from '../../components/detail/TrailerCard';
import { ReviewFeed } from '../../components/detail/ReviewFeed';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { tvShowDetailStyle } from './style/TVShowDetailScreen.style';
import { strDateToYear } from '../../extensions/StringDate';
import { loadTVShowDetailAsync } from '../../../store/slices/tv_shows/TVShowDetailSlice';
import { DetailImage } from '../../components/detail/DetailImage';
import { NO_DESCRIPTION_TEXT } from '../../Constants';
import { CurrentSeason } from './components/CurrentSeason';

interface Props extends StackScreenProps<RootStackParams, 'TVShowDetailScreen'> { };

export const TVShowDetailScreen = ({ route }: Props) => {

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch()
  const tvShowId = route.params.tvShowId
  const { isLoading, detail, error } = useAppSelector(state => state.tvShowDetail);

  const uri = `https://image.tmdb.org/t/p/original${detail?.posterPath}`;

  useEffect(() => {
    dispatch(loadTVShowDetailAsync(tvShowId))
  }, [tvShowId])


  if (isLoading) {
    return <View style={{
      ...tvShowDetailStyle.container,
      justifyContent: 'center'
    }}>
      <LoadingView />
    </View>
  }

  return (
    <View style={tvShowDetailStyle.container}>
      <ScrollView contentContainerStyle={{
        paddingBottom: 80
      }}>
        <View>
          {/* Detail image */}
          <DetailImage uri={uri} genres={detail?.genreIds} onBackClicked={() => navigation.goBack()} />

          {/* Title Section */}
          <View style={tvShowDetailStyle.titleContainer}>
            <Text style={tvShowDetailStyle.title}>{detail?.name}</Text>
            <View style={tvShowDetailStyle.valorationContainer}>
              <Text style={tvShowDetailStyle.valorationTitle}>{detail?.voteAverage.toFixed(1) || 0.0}</Text>
              <Icon name='star' size={18} style={{ color: '#dcb189' }} />
            </View>
          </View>

          {/* Year Director Section */}
          <YearDirector year={strDateToYear(detail?.firstAirDate)} director={detail?.director || ''} />

          {/* Overview Section */}
          <Text style={tvShowDetailStyle.overviewText}>{detail?.overview || NO_DESCRIPTION_TEXT}</Text>

          {/* Season */}
          <CurrentSeason
            tvShowTitle={detail?.name}
            season={detail?.seasons !== undefined ? detail.seasons[0] : undefined} />

          {/* Cast Section */}
          <CastFeed casts={detail?.credits?.cast} width={100} />

          {/* Trailer Section */}
          <TrailerCard trailerUri={detail?.trailer} />

          {/* Comment Section */}
          <ReviewFeed reviews={detail?.reviews?.results} />
        </View>
      </ScrollView>

      <TouchableOpacity activeOpacity={0.9} style={tvShowDetailStyle.buttonProvider} onPress={() => {
        navigation.navigate('WatchProviderScreen', { itemId: detail?.id, itemType: 'tvShow' })
      }}>
        <Text style={tvShowDetailStyle.buttonText}>Watch</Text>
      </TouchableOpacity>
    </View>
  )
}


