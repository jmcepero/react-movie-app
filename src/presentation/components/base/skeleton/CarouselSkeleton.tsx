import {View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Skeleton from 'react-native-reanimated-skeleton';
import {skeletonDarkColor, skeletonLightColor} from '../../../utils/Colors';
import {Dimensions} from 'react-native';

interface Props {
  isLoading: boolean;
}

export const CarouselSkeleton = ({isLoading}: Props) => {
  const pageWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <View>
      <Skeleton
        containerStyle={{flex: 1}}
        isLoading={isLoading}
        layout={[
          {
            key: 'text',
            width: 100,
            height: 18,
            borderRadius: 15,
            marginTop: 16,
            top: 4,
            marginHorizontal: 18,
          },
        ]}
        boneColor={skeletonDarkColor}
        highlightColor={skeletonLightColor}
        duration={2000}
      />

      <Carousel
        width={pageWidth}
        height={height * 0.35}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
          parallaxAdjacentItemScale: 0.8,
        }}
        data={['', '', '', '']}
        renderItem={() => (
          <Skeleton
            containerStyle={{flex: 1}}
            isLoading={isLoading}
            layout={[
              {
                key: 'item',
                width: pageWidth,
                height: height * 0.35,
                borderRadius: 15,
              },
            ]}
            boneColor={skeletonDarkColor}
            highlightColor={skeletonLightColor}
            duration={2000}
          />
        )}
      />

      <Skeleton
        containerStyle={{flex: 1}}
        isLoading={isLoading}
        layout={[
          {
            key: 'indicator',
            width: 110,
            height: 18,
            borderRadius: 12,
            alignSelf: 'center',
          },
        ]}
        boneColor={skeletonDarkColor}
        highlightColor={skeletonLightColor}
        duration={2000}
      />
    </View>
  );
};
