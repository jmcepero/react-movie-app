import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  PanResponder, // Import PanResponder
  GestureResponderEvent, // Tipo para eventos de gestos
  PanResponderGestureState, // Tipo para el estado del gesto
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface OnboardingScreenData {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

const ONBOARDING_SCREENS: OnboardingScreenData[] = [
  {
    id: '1',
    title: 'Your Movie & TV Universe Awaits!',
    subtitle:
      'Dive into thousands of titles. From blockbuster hits to indie gems, your next obsession is right here.',
    backgroundColor: '#FFC3A0',
  },
  {
    id: '2',
    title: 'Find Your Faves, Fast!',
    subtitle:
      'Browse top charts, search by actor, or use smart filters to unearth hidden gems. Your perfect watch is just a tap away.',
    backgroundColor: '#A0C4FF',
  },
  {
    id: '3',
    title: 'Never Lose a Gem Again!',
    subtitle:
      'Spotted something awesome? Save it to your faves, build your ultimate watchlist, and let the show begin!',
    backgroundColor: '#9BF6CF',
  },
];

const SWIPE_THRESHOLD = screenWidth * 0.25; // Distancia mínima para considerar un swipe

const OnboardingStackedFadeWithSwipe: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const opacities = useRef(
    ONBOARDING_SCREENS.map((_, i) => new Animated.Value(i === 0 ? 1 : 0)),
  ).current;

  // Animación de transición entre pantallas
  const transitionTo = (nextIndex: number, duration: number = 300) => {
    if (
      nextIndex === currentIndex ||
      nextIndex < 0 ||
      nextIndex >= ONBOARDING_SCREENS.length
    ) {
      return; // No hacer nada si el índice es inválido o es el mismo
    }

    Animated.parallel([
      Animated.timing(opacities[currentIndex], {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacities[nextIndex], {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
      // Resetear opacidades de otras pantallas si es necesario (aunque con absoluteFill y opacity 0 no deberían ser visibles)
      // opacities.forEach((opacityAnim, idx) => {
      //   if (idx !== nextIndex && idx !== currentIndex) { // No la que entra ni la que acaba de salir
      //     opacityAnim.setValue(0);
      //   }
      // });
    });
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SCREENS.length - 1) {
      transitionTo(currentIndex + 1);
    } else {
      // Lógica para finalizar el onboarding
      console.log('Onboarding Finished!');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      transitionTo(currentIndex - 1);
    }
  };

  // --- PanResponder para gestos de swipe ---
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _,
        gestureState: PanResponderGestureState,
      ) => {
        // Activar solo si el movimiento horizontal es mayor que el vertical
        // y supera un pequeño umbral para evitar activaciones accidentales.
        const {dx, dy} = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const {dx} = gestureState;
        if (dx > SWIPE_THRESHOLD) {
          // Swipe Right (lógica invertida para "anterior")
          handlePrev();
        } else if (dx < -SWIPE_THRESHOLD) {
          // Swipe Left (lógica para "siguiente")
          handleNext();
        }
        // No se necesita `onPanResponderMove` para este efecto simple de fade al soltar.
        // Si quisiéramos una animación de "arrastre" con opacidad, se usaría aquí.
      },
    }),
  ).current;

  // --- Paginator (dots) ---
  const Paginator: React.FC = () => (
    <View style={styles.paginatorContainer}>
      {ONBOARDING_SCREENS.map((_, index) => (
        <Animated.View // Usamos Animated.View para animar opacidad del punto si quisiéramos
          key={`dot-${index}`}
          style={[
            styles.dot,
            {opacity: currentIndex === index ? 1 : 0.3},
            // Podríamos animar la opacidad del dot con `opacities[index]` si el efecto es deseado
            // pero para este caso, el currentIndex es suficiente.
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} {...panResponder.panHandlers}>
      <View style={styles.container}>
        {ONBOARDING_SCREENS.map((screen, index) => (
          <Animated.View
            key={screen.id}
            style={[
              styles.screen,
              {
                backgroundColor: screen.backgroundColor,
                opacity: opacities[index],
                // Asegurar que solo la pantalla visible sea interactiva si tuviera botones internos
                // zIndex para asegurar que la pantalla activa esté "encima" visualmente
                zIndex: currentIndex === index ? 1 : 0,
              },
            ]}
            // Si las pantallas tuvieran elementos interactivos, podríamos necesitar:
            // pointerEvents={currentIndex === index ? 'auto' : 'none'}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{screen.title}</Text>
              <Text style={styles.subtitle}>{screen.subtitle}</Text>
            </View>
          </Animated.View>
        ))}
        <Paginator />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === ONBOARDING_SCREENS.length - 1
              ? "Let's Dive In!"
              : 'Next'}
          </Text>
        </TouchableOpacity>
        {/* Botón de Skip opcional */}
        {currentIndex < ONBOARDING_SCREENS.length - 1 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => console.log('Skip Onboarding')}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Un color de fondo para el SafeAreaView
  },
  container: {
    flex: 1,
    // PanResponder necesita que el View donde se aplican los handlers ocupe el espacio deseado para los gestos
  },
  screen: {
    ...StyleSheet.absoluteFillObject, // Clave para la superposición
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Padding para el contenido dentro de la pantalla
  },
  content: {
    // Contenedor para el texto, para centrarlo y darle márgenes
    maxWidth: '90%', // Evita que el texto se pegue a los bordes en pantallas anchas
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  paginatorContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginHorizontal: 6,
  },
  nextButton: {
    position: 'absolute',
    bottom: screenHeight * 0.06,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 25,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top:
      screenHeight * 0.02 + (Dimensions.get('window').height > 800 ? 40 : 20), // Ajuste para notch/status bar
    right: 20,
    padding: 10,
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default OnboardingStackedFadeWithSwipe;
