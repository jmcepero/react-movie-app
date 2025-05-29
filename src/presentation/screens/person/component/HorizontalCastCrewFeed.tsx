import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Cast} from '../../../../data/people/entities/PeopleInterfaces';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import CastItem from '../../../components/listing/CastItem';
import {fractionWidth} from '../../../utils/Dimen';

interface Props {
  title?: string;
  cast: Cast[];
  isTvShow: boolean;
  navigation: StackNavigationProp<ParamListBase>;
}

export const HorizontalCastCrewFeed = ({
  title,
  cast,
  isTvShow,
  navigation,
}: Props) => {
  return cast.length > 0 ? (
    <View>
      {title && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      )}
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
        }}
        data={cast}
        renderItem={({index}) => (
          <CastItem
            cast={cast[index]}
            width={fractionWidth}
            onClick={item =>
              !isTvShow
                ? navigation.navigate('DetailScreen', {
                    movieId: item.id,
                  })
                : navigation.navigate('TVShowDetailScreen', {
                    tvShowId: item.id,
                  })
            }
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : (
    <></>
  );
};

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
    marginHorizontal: 4,
  },
});
