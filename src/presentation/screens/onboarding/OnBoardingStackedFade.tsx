import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// PanResponder se añadiría aquí para gestos de swipe

const {width: screenWidth} = Dimensions.get('window');

interface OnboardingScreenData {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

// ... (definición de ONBOARDING_SCREENS y OnboardingScreenData) ...
const ONBOARDING_SCREENS: OnboardingScreenData[] = [
  {
    id: '1',
    title: 'Screen 1: Stacked',
    subtitle: 'Pure fade in place.',
    backgroundColor: '#ffc09f',
  },
  {
    id: '2',
    title: 'Screen 2: Absolute',
    subtitle: 'Opacity animation.',
    backgroundColor: '#a0ced9',
  },
  {
    id: '3',
    title: 'Screen 3: Full Control',
    subtitle: 'Next!',
    backgroundColor: '#adf7b6',
  },
];

const OnboardingStackedFade: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Array de valores animados para la opacidad de cada pantalla
  const opacities = useRef(
    ONBOARDING_SCREENS.map((_, i) => new Animated.Value(i === 0 ? 1 : 0)),
  ).current;

  const transitionTo = (nextIndex: number) => {
    if (
      nextIndex === currentIndex ||
      nextIndex < 0 ||
      nextIndex >= ONBOARDING_SCREENS.length
    )
      return;

    Animated.parallel([
      Animated.timing(opacities[currentIndex], {
        toValue: 0,
        duration: 300, // Duración del fade out
        useNativeDriver: true,
      }),
      Animated.timing(opacities[nextIndex], {
        toValue: 1,
        duration: 300, // Duración del fade in
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
    });
  };

  const handleNext = () => {
    transitionTo(currentIndex + 1);
  };

  const handlePrev = () => {
    transitionTo(currentIndex - 1);
  };

  // Aquí integrarías PanResponder para llamar a handleNext/handlePrev con swipe

  return (
    <View style={stylesStacked.container}>
      {ONBOARDING_SCREENS.map((screen, index) => (
        <Animated.View
          key={screen.id}
          style={[
            stylesStacked.screen,
            {
              backgroundColor: screen.backgroundColor,
              opacity: opacities[index],
            },
            // `pointerEvents` asegura que solo la vista visible reciba toques
            // { pointerEvents: currentIndex === index ? 'auto' : 'none' } // Si hay elementos interactivos
          ]}>
          <Text style={stylesStacked.title}>{screen.title}</Text>
          <Text style={stylesStacked.subtitle}>{screen.subtitle}</Text>
        </Animated.View>
      ))}
      <View style={stylesStacked.controls}>
        <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Text>Screen {currentIndex + 1}</Text>
        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === ONBOARDING_SCREENS.length - 1}>
          <Text>
            {currentIndex === ONBOARDING_SCREENS.length - 1 ? 'Done' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesStacked = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    ...StyleSheet.absoluteFillObject, // Hace que todas las vistas se superpongan
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {fontSize: 16, textAlign: 'center', color: '#555'},
  controls: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default OnboardingStackedFade;
