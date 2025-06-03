// OnboardingScreen.tsx
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fullWidth} from '../../utils/Dimen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNMovieButton from '../../components/base/RNMovieButton';
import {getFontFamily} from '../../utils/Fonts';
import {
  darkColor,
  primaryRed,
  primaryTextColor,
  secondaryTextColor,
} from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {OnboardingSlide, onboardingSlides} from './Constants';
import AnimatedSwiper from './components/AnimatedSwiper';
import {MotiText} from 'moti';

const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const skipOnboarding = () => {
    navigation.navigate('MainApp' as never);
  };

  useEffect(() => {
    Animated.timing(animatedPosition, {
      toValue: currentIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const renderItem = ({item}: {item: OnboardingSlide}) => (
    <View style={styles.slide} key={item.id}>
      <ImageBackground source={item.image} style={styles.backgroundImage}>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          colors={['rgba(23, 24, 27, 0.65)', 'rgba(23, 24, 27, 1)']}
          locations={[0.5, 0.8]}
        />
      </ImageBackground>
    </View>
  );

  const renderDots = () => {
    return onboardingSlides.map((_, i) => {
      const inputRange = [i - 1, i, i + 1];

      const dotWidth = animatedPosition.interpolate({
        inputRange,
        outputRange: [8, 20, 8],
        extrapolate: 'clamp',
      });

      const opacity = animatedPosition.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={i.toString()}
          style={[styles.dot, {width: dotWidth, opacity}]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedSwiper
        duration={600}
        onIndexChange={setCurrentIndex}
        currentIndex={currentIndex}>
        {onboardingSlides.map(item => renderItem({item}))}
      </AnimatedSwiper>

      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <MotiText
          style={styles.title}
          key={onboardingSlides[currentIndex].title}
          from={{opacity: 0, translateY: 20}}
          animate={{opacity: 1, translateY: 0}}
          exit={{opacity: 0, translateX: -20}}>
          {onboardingSlides[currentIndex].title}
        </MotiText>
        <Text style={styles.description}>
          {onboardingSlides[currentIndex].description}
        </Text>

        <View style={styles.buttonBar}>
          <RNMovieButton
            onClick={() => {
              if (currentIndex < onboardingSlides.length - 1) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            label={
              currentIndex === onboardingSlides.length - 1
                ? 'Get Started'
                : 'Next'
            }
          />

          <View style={styles.dotsContainer}>{renderDots()}</View>
        </View>
      </View>

      <Pressable onPress={skipOnboarding} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColor,
  },
  slide: {
    width: fullWidth,
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23,24,27,0.8)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  title: {
    color: primaryTextColor,
    fontSize: 34,
    fontFamily: getFontFamily('bold'),
    marginBottom: 16,
  },
  description: {
    color: secondaryTextColor,
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 24,
    fontFamily: getFontFamily('normal'),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: 'rgba(1, 180, 228, 0.2)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#01b4e4',
  },
  tagText: {
    color: '#01b4e4',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonBar: {
    width: fullWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: primaryRed,
    marginHorizontal: 4,
    marginTop: 16,
  },
  skipButton: {
    backgroundColor: 'rgba(251,246,248,0.1)',
    position: 'absolute',
    right: 0,
    top: 24,
    borderTopStartRadius: 16,
    borderBottomStartRadius: 16,
  },
  skipButtonText: {
    color: primaryTextColor,
    fontSize: 14,
    fontFamily: getFontFamily('normal'),
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attribution: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  attributionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});

export default OnboardingScreen;
