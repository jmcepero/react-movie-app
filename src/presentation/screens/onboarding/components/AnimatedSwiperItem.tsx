import {memo, useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

/**
 * Props for the AnimatedSwiperItem component.
 * @interface AnimatedSwiperItemProps
 * @property {number} fadingValue - Controls the opacity of the item (0 = hidden, 1 = visible).
 * @property {React.ReactNode} children - Content to display with animated opacity.
 * @property {number} duration - Duration of the fade animation in milliseconds.
 */
interface AnimatedSwiperItemProps {
  fadingValue: number;
  children: React.ReactNode;
  duration: number;
}

/**
 * Component that wraps content with animated opacity transitions.
 * Used internally by AnimatedSwiper to create smooth fade transitions between slides.
 *
 * @component
 * @example
 * <AnimatedSwiperItem
 *   fadingValue={1}
 *   duration={300}>
 *   <YourContent />
 * </AnimatedSwiperItem>
 */
const AnimatedSwiperItem: React.FC<AnimatedSwiperItemProps> = ({
  fadingValue,
  children,
  duration,
}) => {
  /**
   * Shared value that drives the opacity animation
   * @type {Animated.SharedValue<number>}
   */
  const fadingAnimationValue = useSharedValue(0);

  /**
   * Animated style with smooth opacity transitions
   */
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadingAnimationValue.value, {
        duration,
        easing: Easing.ease,
      }),
    };
  });

  /**
   * Update animation value when fadingValue prop changes
   */
  useEffect(() => {
    fadingAnimationValue.value = fadingValue;
  }, [fadingValue]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

/**
 * Memoized version of AnimatedSwiperItem that only re-renders when fadingValue changes
 */
export default memo(AnimatedSwiperItem, (prev, next) => {
  return prev.fadingValue === next.fadingValue;
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
});
