import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import AnimatedSwiperItem from './AnimatedSwiperItem';
import useSwipe from '../hook/useSwiper';

/**
 * Props for the AnimatedSwiper component.
 * @interface AnimatedSwiperProps
 * @property {React.ReactNode} children - Elements to display in the swiper.
 * @property {number} [duration=300] - Animation duration in milliseconds.
 * @property {(index: number) => void} [onIndexChange] - Callback that executes when the active index changes.
 * @property {ViewStyle} [style] - Additional styles to apply to the container.
 * @property {number} [currentIndex] - Externally controlled index (optional).
 */
interface AnimatedSwiperProps {
  children: React.ReactNode;
  duration?: number;
  onIndexChange?: (index: number) => void;
  style?: ViewStyle;
  currentIndex?: number;
}

/**
 * Carousel component with fade animations between elements.
 *
 * @component
 * @example
 * // Uncontrolled mode (internal index management)
 * <AnimatedSwiper duration={600} onIndexChange={setIndex}>
 *   {slides.map(slide => <SlideComponent key={slide.id} {...slide} />)}
 * </AnimatedSwiper>
 *
 * @example
 * // Controlled mode (externally controlled index)
 * <AnimatedSwiper
 *   duration={600}
 *   currentIndex={activeIndex}
 *   onIndexChange={setIndex}>
 *   {slides.map(slide => <SlideComponent key={slide.id} {...slide} />)}
 * </AnimatedSwiper>
 */
const AnimatedSwiper: React.FC<AnimatedSwiperProps> = ({
  children,
  duration = 300,
  onIndexChange,
  style,
  currentIndex,
}) => {
  const childrenArray: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];
  const childrenLength = childrenArray.length;

  const [fadingValues, setFadingValues] = useState<number[]>(
    childrenArray.map((_, index) => (index === 0 ? 1 : 0)),
  );

  const [activeIndex, setActiveIndex] = useState<number>(currentIndex || 0);

  useEffect(() => {
    if (currentIndex !== undefined && currentIndex !== activeIndex) {
      const isNext = currentIndex > activeIndex;

      const newFadingValues = [...fadingValues];
      newFadingValues[activeIndex] = 0;
      newFadingValues[currentIndex] = 1;
      setFadingValues(newFadingValues);
      setActiveIndex(currentIndex);
    }
  }, [currentIndex]);

  const setFadingValue = useCallback(
    (isNext: boolean) => {
      const newFadingValues = [...fadingValues];
      newFadingValues[activeIndex] = 0;
      newFadingValues[activeIndex + (isNext ? 1 : -1)] = 1;
      setFadingValues(newFadingValues);
    },
    [activeIndex],
  );

  const onSwipeLeftHandler = useCallback(() => {
    if (activeIndex > 0) {
      setFadingValue(false);
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const onSwipeRightHandler = useCallback(() => {
    if (activeIndex < childrenLength - 1) {
      setFadingValue(true);
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const [onTouchStart, onTouchEnd] = useSwipe(
    onSwipeLeftHandler,
    onSwipeRightHandler,
  );

  useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  return (
    <View
      style={[styles.container, style]}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      {childrenArray.map((child, index) => {
        return (
          <AnimatedSwiperItem
            key={index}
            fadingValue={fadingValues[index]}
            duration={duration}>
            {child}
          </AnimatedSwiperItem>
        );
      })}
    </View>
  );
};

export default AnimatedSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00272F',
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
