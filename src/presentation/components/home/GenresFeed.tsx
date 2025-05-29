import { useEffect } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomGenre} from '../../../data/genre/local/CustomGenres';
import {GenreCard} from './GenreCard';
import Skeleton from 'react-native-reanimated-skeleton';
import {
  primaryRed,
  skeletonDarkColor,
  skeletonLightColor,
} from '../../utils/Colors';

interface Props {
  genres: CustomGenre[];
  isLoading: boolean;
  onClick?: (value: CustomGenre) => void;
  onSeeAllClicked: () => void;
}

export const GenresFeed = ({
  genres,
  isLoading,
  onClick,
  onSeeAllClicked,
}: Props) => {
  return !isLoading ? (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Genres</Text>
        <TouchableOpacity onPress={onSeeAllClicked}>
          <Text style={styles.button}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        data={genres}
        renderItem={({index}) => (
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
            }}>
            <GenreCard genre={genres[index]} onClick={onClick} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : (
    <View>
      <Skeleton
        containerStyle={{flex: 1}}
        isLoading={isLoading}
        layout={[
          {
            key: 'title',
            width: 100,
            height: 18,
            borderRadius: 15,
            marginHorizontal: 18,
            marginTop: 30,
          },
        ]}
        boneColor={skeletonDarkColor}
        highlightColor={skeletonLightColor}
        duration={2000}
      />

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 18,
          marginTop: 8,
          gap: 8,
        }}
        data={genres}
        renderItem={_ => (
          <Skeleton
            containerStyle={{flex: 1}}
            isLoading={isLoading}
            layout={[
              {
                key: 'card',
                width: 160,
                height: 160,
                borderRadius: 15,
              },
              {
                key: 'text',
                width: 50,
                height: 12,
                borderRadius: 12,
                marginTop: 8,
              },
            ]}
            boneColor={skeletonDarkColor}
            highlightColor={skeletonLightColor}
            duration={2000}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 26,
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
    color: primaryRed,
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
