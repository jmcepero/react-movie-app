import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  darkColor,
  iconSecondaryColor,
  primaryRed,
  skeletonDarkColor,
  skeletonLightColor,
} from '../../utils/Colors';
import {getFontFamily} from '../../utils/Fonts';

interface Props {
  onClick: () => void;
  onFilterClicked: () => void;
  isLoading: boolean;
}

export const SearchBar = ({onClick, onFilterClicked, isLoading}: Props) => {
  return !isLoading ? (
    <View style={styles.barRow}>
      <TouchableOpacity style={styles.container} onPress={onClick}>
        <Icon style={styles.icon} name="search-outline" size={22} />
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterClicked}>
        <Icon style={styles.iconFilter} name="options" size={22} />
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <Skeleton
        containerStyle={{flex: 1, marginHorizontal: 16}}
        isLoading={isLoading}
        layout={[
          {
            key: 'search',
            flex: 1,
            width: '100%',
            height: 48,
            borderRadius: 16,
          },
        ]}
        boneColor={skeletonDarkColor}
        highlightColor={skeletonLightColor}
        duration={2000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(24,25,32,1)',
    padding: 14,
    borderRadius: 16,
    marginStart: 16,
    alignItems: 'center',
    flex: 1,
    borderWidth: 0.6,
    borderColor: 'rgba(42,42,50,1)',
  },
  icon: {
    color: iconSecondaryColor,
  },
  text: {
    fontFamily: getFontFamily('normal'),
    fontSize: 14,
    color: '#988396',
    marginHorizontal: 8,
  },
  barRow: {
    flexDirection: 'row',
    gap: 4,
  },
  filterButton: {
    backgroundColor: 'rgba(24,25,32,1)',
    marginEnd: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: 0.6,
    borderColor: 'rgba(42,42,50,1)',
  },
  iconFilter: {
    color: primaryRed,
  },
});
