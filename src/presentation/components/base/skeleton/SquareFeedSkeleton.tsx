import {View, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../../../screens/tv_show/style/TvShow.style';
import Skeleton from 'react-native-reanimated-skeleton';
import {skeletonDarkColor, skeletonLightColor} from '../../../utils/Colors';
import {fractionWidth, fullWidth} from '../../../utils/Dimen';

interface Props {
  isLoading: boolean;
}

const SquareFeedSkeleton = ({isLoading}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
        }}
        columnWrapperStyle={{
          gap: 8,
        }}
        data={['', '', '', '', '', '', '', '']}
        showsVerticalScrollIndicator={false}
        renderItem={({index}) => (
          <Skeleton
            containerStyle={{flex: 1}}
            isLoading={isLoading}
            layout={[
              {
                key: 'item ' + index,
                width: (fullWidth - 40) * 0.5,
                height: 160,
                borderRadius: 15,
              },
            ]}
            boneColor={skeletonDarkColor}
            highlightColor={skeletonLightColor}
            duration={2000}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

export default SquareFeedSkeleton;
