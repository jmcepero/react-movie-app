import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Cast} from '../../../domain/movie/entities/Movies';
import {CastCard} from './CastCard';

interface Props {
  width: number;
  casts?: Cast[];
  onClick?: (cast: Cast) => void;
}

export const CastFeed = ({width, casts, onClick}: Props) => {
  return casts !== undefined && casts.length > 0 ? (
    <View>
      <Text style={styles.headerText}>Cast</Text>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        data={casts}
        renderItem={({index}) => (
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
            }}>
            <CastCard
              cast={casts[index]}
              width={width}
              height={150}
              onClick={onClick}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  headerText: {
    paddingHorizontal: 16,
    fontFamily: 'Archivo-Medium',
    fontSize: 20,
    color: '#fbf6f8',
    marginTop: 8,
  },
});
