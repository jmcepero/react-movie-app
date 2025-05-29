import React, {memo, useCallback} from 'react';
import {Text, View} from 'react-native';
import {Cast} from '../../../../domain/movie/entities/Movies';
import {CastCard} from '../cast/CastCard';
import {FlashList} from '@shopify/flash-list';
import {styles} from './CastFeed.styles';

interface Props {
  width: number;
  casts?: Cast[];
  onClick?: (cast: Cast) => void;
}

export const CastFeed = memo(({width, casts, onClick}: Props) => {
  if (!casts || casts.length === 0) return null;

  const renderCastItem = useCallback(
    ({item}: {item: Cast}) => (
      <View style={styles.itemContainer}>
        <CastCard cast={item} width={width} height={150} onClick={onClick} />
      </View>
    ),
    [width, onClick],
  );

  const keyExtractor = useCallback((item: Cast) => `cast-${item.id}`, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cast</Text>
      <FlashList
        contentContainerStyle={styles.listContainer}
        data={casts}
        renderItem={renderCastItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
      />
    </View>
  );
});

CastFeed.displayName = 'CastFeed';
