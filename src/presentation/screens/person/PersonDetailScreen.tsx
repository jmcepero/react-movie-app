import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import { useContext, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../navigation/StackNavigation';
import {LoadingView} from '../../components/base/LoadingView';
import {MobXProviderContext, observer} from 'mobx-react';
import PersonStore from './store/PersonStore';
import DetailPeopleImage from './component/DetailPeopleImage';
import {styles} from '../tv_show/style/TvShow.style';
import {FadeInImage} from '../../components/base/FadeImage';
import {Dimensions} from 'react-native';
import {Text} from 'react-native';
import {formatDateAndAge} from '../../utils/Date';
import ExpandableText from '../../components/base/ExpandableText';
import {HorizontalCastCrewFeed} from './component/HorizontalCastCrewFeed';

interface Props
  extends StackScreenProps<RootStackParams, 'PersonDetailScreen'> {}
const {height} = Dimensions.get('window');

export const PersonDetailScreen = observer(({route}: Props) => {
  const {personStore} = useContext(MobXProviderContext) as {
    personStore: PersonStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const personId = route.params.personId;

  useEffect(() => {
    personStore.onScreenLoaded(personId);
  }, [personId, personStore]);

  if (personStore.isLoading || personStore.person === undefined) {
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
          <View style={{height: height * 0.61}}>
            {/* Detail image */}
            <DetailPeopleImage
              image={personStore.portraitImage}
              onBackClicked={() => navigation.goBack()}
            />

            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                marginHorizontal: 12,
                bottom: 0,
              }}>
              <View style={customStyles.imageContainer}>
                <FadeInImage
                  uri={`https://image.tmdb.org/t/p/original${personStore.person.profile_path}`}
                  style={customStyles.imageProfile}
                />
              </View>

              <View style={customStyles.birthdayContainer}>
                <Text style={customStyles.birthdayTitle}>Birthday</Text>
                <Text style={customStyles.birthdaySubtitle}>
                  {formatDateAndAge(personStore.person.birthday)}
                </Text>
                <View style={customStyles.space4} />
                <Text style={customStyles.birthdayTitle}>Place of Birth</Text>
                <Text style={customStyles.birthdaySubtitle}>
                  {personStore.person.place_of_birth}
                </Text>
              </View>
            </View>
          </View>

          {/* Title Section */}
          <View style={customStyles.titleContainer}>
            <Text
              style={customStyles.title}
              numberOfLines={2}
              ellipsizeMode={'tail'}>
              {personStore.person.name}
            </Text>

            <View style={customStyles.genreContainer}>
              <View style={customStyles.genreChip}>
                <Text style={customStyles.genreChipTitle}>
                  {personStore.person.known_for_department}
                </Text>
              </View>
            </View>
          </View>

          {/* Overview Section */}
          {personStore.person.biography && (
            <ExpandableText
              style={customStyles.overviewText}
              numberOfLines={10}>
              {personStore.person.biography}
            </ExpandableText>
          )}

          {/* know for */}
          {personStore.person.movie_credits.cast.length > 0 && (
            <HorizontalCastCrewFeed
              title="Movie credits"
              cast={personStore.person.movie_credits.cast.slice(0, 12)}
              navigation={navigation}
              isTvShow={false}
            />
          )}

          {/* know for */}
          {personStore.person.tv_credits.cast.length > 0 && (
            <HorizontalCastCrewFeed
              title="Tv credits"
              cast={personStore.person.tv_credits.cast.slice(0, 12)}
              isTvShow={true}
              navigation={navigation}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
});

export const customStyles = StyleSheet.create({
  imageProfile: {
    width: 120,
    height: 160,
    borderRadius: 15,
  },
  imageContainer: {
    width: 120,
    height: 160,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#2B2533',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  title: {
    fontFamily: 'Archivo-Medium',
    fontSize: 32,
    color: '#fbf6f8',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: '#988396',
  },
  overviewText: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    lineHeight: 18,
    color: '#9b959c',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    paddingTop: 6,
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
  birthdayContainer: {
    flex: 1,
    marginStart: 12,
    marginEnd: 12,
    justifyContent: 'flex-end',
  },
  space4: {
    height: 6,
  },
  birthdayTitle: {
    fontFamily: 'Archivo-Medium',
    fontSize: 12,
    color: '#988396',
  },
  birthdaySubtitle: {
    fontFamily: 'Archivo-Thin',
    fontSize: 11,
    color: '#9b959c',
  },
});
