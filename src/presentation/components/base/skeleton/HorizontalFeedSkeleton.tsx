import {View, FlatList} from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import {skeletonDarkColor, skeletonLightColor} from '../../../utils/Colors';
import {fullWidth} from '../../../utils/Dimen';

interface Props {
  isLoading: boolean;
}

const HorizontalFeedSkeleton = ({isLoading}: Props) => {
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
          paddingHorizontal: 16,
          gap: 8,
          marginTop: 8,
        }}
        data={['', '', '', '']}
        renderItem={_ => (
          <Skeleton
            containerStyle={{flex: 1}}
            isLoading={isLoading}
            layout={[
              {
                key: 'item',
                width: fullWidth * 0.42,
                height: 220,
                borderRadius: 15,
              },
            ]}
            boneColor={skeletonDarkColor}
            highlightColor={skeletonLightColor}
            duration={2000}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalFeedSkeleton;
