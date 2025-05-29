import { useState, useEffect } from 'react';
import {StyleSheet, View, Animated} from 'react-native';

interface Props {
  numPages: number;
  currentPage: number;
}

const PagerIndicator = ({numPages, currentPage}: Props) => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentPage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, currentPage]);

  const dotStyle = (index: number) => {
    const opacity = animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });
    const backgroundColor = animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ['#544558', '#988397', '#544558'],
      extrapolate: 'clamp',
    });
    return {
      opacity,
      backgroundColor,
      width: 7,
      height: 7,
      borderRadius: 5,
      margin: 3,
    };
  };

  const dots = [];
  for (let i = 0; i < numPages; i++) {
    dots.push(<Animated.View key={i} style={dotStyle(i)} />);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>{dots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
  container: {
    alignSelf: 'baseline',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(56,45,61,0.5)',
  },
});

export default PagerIndicator;
