import {View, FlatList} from 'react-native';
import {styles} from '../../../screens/tv_show/style/TvShow.style';
import Skeleton from 'react-native-reanimated-skeleton';
import {skeletonDarkColor, skeletonLightColor} from '../../../utils/Colors';
import {fractionWidth} from '../../../utils/Dimen';

interface Props {
  isLoading: boolean;
}

const VerticalFeedSkeleton = ({isLoading}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        data={['', '', '', '', '', '']}
        showsVerticalScrollIndicator={false}
        renderItem={({index}) => (
          <Skeleton
            containerStyle={{flex: 1}}
            isLoading={isLoading}
            layout={[
              {
                key: 'item ' + index,
                width: fractionWidth,
                height: 220,
                borderRadius: 15,
                marginVertical: 8,
              },
              {
                key: 'title ' + index,
                width: 80,
                height: 14,
                borderRadius: 14,
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

export default VerticalFeedSkeleton;
