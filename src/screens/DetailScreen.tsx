import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { RootStackParams } from '../navigation/StackNavigation';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { YearDirector } from '../components/detail/YearDirector';
import { MovieCard } from '../components/MovieCard';
import { CastCard } from '../components/detail/CastCard';
import { CastFeed } from '../components/detail/CastFeed';
import { TrailerCard } from '../components/detail/TrailerCard';
import { ReviewCard } from '../components/detail/ReviewCard';
import { ReviewFeed } from '../components/detail/ReviewFeed';
import LoadingView from '../components/base/LoadingView';

const height = Dimensions.get('window').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route }: Props) => {

  const navigation = useNavigation();
  const movie = route.params
  const { detail, director, cast, isLoading, trailerUri, reviews } = useMovieDetail(movie.id);
  const releaseDate = new Date(detail?.release_date || '')

  const uri = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  if (isLoading) {
    return <View style={{
      ...styles.container,
      justifyContent: 'center'
    }}>
      <LoadingView />
    </View>
  }

  return (
    <ScrollView contentContainerStyle={{
      paddingBottom: 16
    }} style={styles.container}>
      <View>
        <View style={{
          height: height * 0.6
        }}>
          <Image source={{ uri }} style={styles.image} />
          <LinearGradient
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            colors={['rgba(255, 255, 255, 0)', 'rgba(33, 25, 32, 1)']}
            locations={[0.5, 0.9]}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonSquare}>
            <View
              style={styles.blurView}
            />
            <Icon style={styles.icon} name='arrow-back-outline' size={28} />
          </TouchableOpacity>

          {/* Gender Sections */}
          <View style={styles.genreContainer}>
            {
              detail?.genres?.map((item, index) => {
                return (
                  <View style={styles.genreChip} key={index}>
                    <Text style={styles.genreChipTitle}>{item.name}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{detail?.title}</Text>
          <View style={styles.valorationContainer}>
            <Text style={styles.valorationTitle}>{detail?.vote_average.toFixed(1) || 0.0}</Text>
            <Icon name='star' size={18} style={{ color: '#dcb189' }} />
          </View>
        </View>

        {/* Year Director Section */}
        <YearDirector year={releaseDate.getUTCFullYear().toString()} director={director || ''} />

        {/* Overview Section */}
        <Text style={styles.overviewText}>{detail?.overview}</Text>

        {/* Cast Section */}
        <CastFeed casts={cast} width={100} />

        {/* Trailer Section */}
        <TrailerCard trailerUri={trailerUri} />

        {/* Comment Section */}
        <ReviewFeed reviews={reviews} />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(33,25,32,1)'
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  buttonSquare: {
    position: 'absolute',
    borderRadius: 8,
    width: 40,
    height: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    start: 16
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'rgba(46,35,49, 0.9)'
  },
  icon: {
    color: 'white'
  },
  title: {
    fontFamily: 'ArchivoMedium',
    fontSize: 34,
    color: '#fbf6f8',
    width: '70%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  valorationContainer: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16
  },
  valorationTitle: {
    fontFamily: 'ArchivoRegular',
    fontSize: 22,
    color: 'white',
    marginEnd: 4
  },
  genreContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 4
  },
  genreChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(46,35,49, 0.7)',
    borderRadius: 6
  },
  genreChipTitle: {
    fontFamily: 'ArchivoThin',
    fontSize: 14,
    color: '#988396'
  },
  overviewText: {
    fontFamily: 'ArchivoRegular',
    fontSize: 18,
    color: '#9b959c',
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});
