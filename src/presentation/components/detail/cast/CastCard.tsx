import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'expo-image';
import {Cast} from '../../../../domain/movie/entities/Movies';
import {getFontFamily} from '../../../utils/Fonts';
import {createCastCardStyles} from './CastCard.styles';

interface Props {
  cast: Cast;
  width?: number;
  height?: number;
  onClick?: (cast: Cast) => void;
}

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';
const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 150;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const CastCard = memo(
  ({cast, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, onClick}: Props) => {
    const styles = createCastCardStyles(width, height);

    const imageUrl = cast.profilePath
      ? `${BASE_IMAGE_URL}${cast.profilePath}`
      : undefined;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClick?.(cast)}
          style={styles.container}>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image
                source={imageUrl}
                style={styles.image}
                placeholder={blurhash}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
                recyclingKey={`image_${cast.id}`}
              />
            ) : (
              <View style={[styles.image, {backgroundColor: '#3a3a3a'}]} />
            )}
          </View>
        </TouchableOpacity>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.caption}>
          {cast?.name || 'Unknown'}
        </Text>
      </View>
    );
  },
);

// Nombre para DevTools
CastCard.displayName = 'CastCard';
