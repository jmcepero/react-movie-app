import React from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParams} from '../../navigation/StackNavigation';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {LoadingView} from '../../components/base/LoadingView';
import {CastFeed} from '../../components/detail/CastFeed';
import {ReviewFeed} from '../../components/detail/ReviewFeed';
import {TrailerCard} from '../../components/detail/TrailerCard';
import {YearDirector} from '../../components/detail/YearDirector';
import {useMovieDetail} from '../../hooks/useMovieDetail';
import {Snackbar} from '@react-native-material/core';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route}: Props) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const movie = route.params;
  const {isLoading, detail, error} = useMovieDetail(movie.id.toString());
  const releaseDate = new Date(detail?.releaseDate || '');

  const uri = `https://image.tmdb.org/t/p/original${movie.posterPath}`;

  if (isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: 'center',
        }}>
        <LoadingView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              height: height * 0.62,
            }}>
            <Image source={{uri}} style={styles.image} />
            <LinearGradient
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
              colors={['transparent', 'rgba(33, 25, 32, 1)']}
              locations={[0.5, 0.9]}
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonSquare}>
              <View style={styles.blurView} />
              <Icon style={styles.icon} name="arrow-back-outline" size={28} />
            </TouchableOpacity>

            {/* Gender Sections */}
            <View style={styles.genreContainer}>
              {detail?.genreIds?.map((item, index) => {
                return (
                  <View style={styles.genreChip} key={index}>
                    <Text style={styles.genreChipTitle}>{item.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{detail?.title}</Text>
            <View style={styles.valorationContainer}>
              <Text style={styles.valorationTitle}>
                {detail?.voteAverage.toFixed(1) || 0.0}
              </Text>
              <Icon name="star" size={18} style={{color: '#dcb189'}} />
            </View>
          </View>

          {/* Year Director Section */}
          <YearDirector
            year={releaseDate.getUTCFullYear().toString()}
            director={detail?.director || ''}
          />

          {/* Overview Section */}
          <Text style={styles.overviewText}>{detail?.overview}</Text>

          {/* Cast Section */}
          <CastFeed casts={detail?.credits?.cast} width={100} />

          {/* Trailer Section */}
          <TrailerCard trailerUri={detail?.trailer || ''} />

          {/* Comment Section */}
          <ReviewFeed reviews={detail?.reviews?.results} />
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.buttonProvider}
        onPress={() => {
          navigation.navigate('WatchProviderScreen', {
            itemId: movie.id,
            itemType: 'movie',
          });
        }}>
        <Text style={styles.buttonText}>Watch</Text>
      </TouchableOpacity>

      {error && (
        <Snackbar
          message={error}
          style={{
            position: 'absolute',
            start: 16,
            end: 16,
            bottom: 90,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(23, 24, 27, 1)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
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
    start: 16,
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'rgba(46,35,49, 0.9)',
  },
  icon: {
    color: 'white',
  },
  title: {
    fontFamily: 'Archivo-Medium',
    fontSize: 34,
    color: '#fbf6f8',
    width: '70%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  valorationContainer: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  valorationTitle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 22,
    color: 'white',
    marginEnd: 4,
  },
  genreContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 4,
  },
  genreChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(46,35,49, 0.7)',
    borderRadius: 6,
  },
  genreChipTitle: {
    fontFamily: 'Archivo-Thin',
    fontSize: 14,
    color: '#988396',
  },
  overviewText: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: '#9b959c',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonProvider: {
    position: 'absolute',
    borderRadius: 16,
    backgroundColor: '#7B44C1',
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    bottom: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Archivo-Medium',
    fontSize: 18,
    color: 'white',
    padding: 16,
  },
});
