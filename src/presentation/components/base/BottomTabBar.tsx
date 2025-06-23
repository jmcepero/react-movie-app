import {
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  darkBlueColor,
  darkBlueColorLighter,
  darkColor,
  onyxColor,
  primaryBlackColor,
  primaryRed,
  secondaryBackgroundColor,
} from '../../utils/Colors';
import Icon from '@react-native-vector-icons/ionicons';
import { useContext } from 'react';
import {
  ScrollAnimationContext,
  TAB_BAR_HEIGHT,
} from '@presentation/utils/ScrollAnimationContext';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');
const icons: string[] = [
  'home-outline',
  'tv-outline',
  'heart-outline',
  'person-outline',
];

const BottomTabBar = ({ state, navigation }: any) => {
  const { isTabBarVisible } = useContext(ScrollAnimationContext);

  return (
    <MotiView
      style={styles.root}
      animate={{
        translateY: isTabBarVisible ? 0 : TAB_BAR_HEIGHT,
      }}
      transition={{
        type: 'timing',
        duration: 250,
      }}
    >
      <View style={styles.mainContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={index} style={styles.mainItemContainer}>
              <Pressable onPress={onPress}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Icon
                    name={icons[index]}
                    size={24}
                    style={{
                      color: isFocused ? primaryRed : 'rgba(152,131,150,0.3)',
                    }}
                  />
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    height: 56,
    bottom: 18,
    left: 0,
    right: 0,
    borderRadius: 25,
    marginHorizontal: width * 0.1,

    backgroundColor: darkBlueColor,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,

    // Propiedad de elevación para Android
    elevation: 16,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default BottomTabBar;
