import React, { createContext } from 'react';
import { Animated } from 'react-native';

export const TAB_BAR_HEIGHT = 56 + 18;

type ScrollAnimationContextType = {
  scrollY: Animated.Value;
  isTabBarVisible: boolean;
};

export const ScrollAnimationContext = createContext<ScrollAnimationContextType>(
  {
    scrollY: new Animated.Value(0),
    isTabBarVisible: true,
  },
);
