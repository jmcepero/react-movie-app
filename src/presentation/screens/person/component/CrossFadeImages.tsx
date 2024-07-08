import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const FADE_DURATION = 500;
const IMAGE_INTERVAL = 2000;

type CrossFadeImagesProps = {
  images: string[];
  interval?: number;
  fadeDuration?: number;
  loop?: boolean;
  children?: React.ReactNode;
};

const ImageComponent = React.memo(
  ({
    imageUrl,
    isActive,
    fadeDuration = FADE_DURATION,
  }: {
    imageUrl: string;
    isActive: boolean;
    fadeDuration?: number;
  }) => {
    const opacity = useSharedValue(0);
    useEffect(() => {
      opacity.value = withTiming(isActive ? 1 : 0, {
        duration: fadeDuration,
        easing: Easing.inOut(Easing.ease),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);
    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        width: '100%',
        height: '100%',
        position: 'absolute',
      };
    });
    return (
      <Animated.Image
        style={[animatedStyles]}
        source={{uri: imageUrl}}
        resizeMode="cover"
      />
    );
  },
);

export const CrossFadeImages: React.FC<CrossFadeImagesProps> = ({
  images,
  interval = IMAGE_INTERVAL,
  fadeDuration = FADE_DURATION,
  children,
  loop = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (loop) {
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
      } else {
        if (activeIndex < images.length - 1) {
          setActiveIndex(prevIndex => prevIndex + 1);
        }
      }
    }, interval);
    return () => clearInterval(animationInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, activeIndex]);
  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
      {images.map((imageUrl, index) => (
        <ImageComponent
          key={imageUrl + index}
          imageUrl={imageUrl}
          isActive={index === activeIndex}
          fadeDuration={fadeDuration}
        />
      ))}
      {children}
    </View>
  );
};
