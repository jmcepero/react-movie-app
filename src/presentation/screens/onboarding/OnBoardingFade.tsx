import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
  TouchableOpacity, // Para el botón de Next
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface OnboardingItemData {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

const ONBOARDING_SCREENS: OnboardingItemData[] = [
  {
    id: '1',
    title: 'Your Movie & TV Universe Awaits!',
    subtitle:
      'Dive into thousands of titles. From blockbuster hits to indie gems, your next obsession is right here.',
    backgroundColor: 'rgba(255, 195, 160, 0.7)', // Usar colores con algo de transparencia si se superponen
  },
  {
    id: '2',
    title: 'Find Your Faves, Fast!',
    subtitle:
      'Browse top charts, search by actor, or use smart filters to unearth hidden gems. Your perfect watch is just a tap away.',
    backgroundColor: 'rgba(160, 196, 255, 0.7)',
  },
  {
    id: '3',
    title: 'Never Lose a Gem Again!',
    subtitle:
      'Spotted something awesome? Save it to your faves, build your ultimate watchlist, and let the show begin!',
    backgroundColor: 'rgba(155, 246, 207, 0.7)',
  },
];

interface OnboardingItemProps {
  item: OnboardingItemData;
  index: number;
  scrollX: Animated.Value;
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({
  item,
  index,
  scrollX,
}) => {
  const inputRange = [
    (index - 1) * screenWidth, // Pantalla anterior
    index * screenWidth, // Pantalla actual
    (index + 1) * screenWidth, // Pantalla siguiente
  ];

  // Opacidad: El item es completamente visible (1) solo cuando está centrado.
  // Se vuelve completamente invisible (0) tan pronto como se desplaza ligeramente del centro.
  // Esto crea un efecto de cross-fade porque el item que se va se vuelve transparente
  // mientras el nuevo item (que también sigue esta lógica) se vuelve opaco.
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0], // Crucial: 0 opacidad para vecinos, 1 para el actual
    extrapolate: 'clamp', // Evita que la opacidad salga del rango 0-1
  });

  // Para enfatizar el fade y no el slide, podríamos hacer que el `transform` también
  // sea sutil o nulo para el contenido, pero el FlatList ya lo mueve.
  // La clave es que el item que no está en el centro tenga opacidad 0.

  return (
    // Este View es el que FlatList mueve. Debe ocupar el ancho de la pantalla.
    <View
      style={{
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={[
          styles.itemContentContainer,
          {
            opacity, // La opacidad controla la visibilidad
            backgroundColor: item.backgroundColor,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </Animated.View>
    </View>
  );
};

const OnBoardingFade: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<OnboardingItemData>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Actualizar el índice actual cuando cambia la vista
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Considerar visible si el 50% está en pantalla
  }).current;

  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingItemData;
    index: number;
  }) => {
    return <OnboardingItem item={item} index={index} scrollX={scrollX} />;
  };

  const Paginator: React.FC<{data: any[]; scrollX: Animated.Value}> = ({
    data,
    scrollX,
  }) => (
    <View style={styles.paginatorContainer}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * screenWidth,
          i * screenWidth,
          (i + 1) * screenWidth,
        ];
        const dotOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity: dotOpacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );

  const scrollToNext = () => {
    if (currentIndex < ONBOARDING_SCREENS.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Lógica para finalizar el onboarding
      console.log('Onboarding Finished!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SCREENS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false}, // 'opacity' en Views estándar a menudo requiere false.
          // 'true' es para transformaciones y opacidad en componentes nativos como <Image>
        )}
        scrollEventThrottle={16} // Para animaciones suaves (16ms ~ 60fps)
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // Estilo para el FlatList para que los items se superpongan si es necesario
        // (aunque con la opacidad debería bastar para el efecto visual)
        // style={{ flex: 1 }} // Asegura que ocupe el espacio
      />
      <Paginator data={ONBOARDING_SCREENS} scrollX={scrollX} />
      <TouchableOpacity style={styles.nextButton} onPress={scrollToNext}>
        <Text style={styles.nextButtonText}>
          {currentIndex === ONBOARDING_SCREENS.length - 1
            ? "Let's Dive In!"
            : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Un fondo base si los items son transparentes
  },
  // El contenido real del item, que se desvanece
  itemContentContainer: {
    width: screenWidth * 0.9, // Hacemos el contenido un poco más pequeño que la pantalla
    height: screenHeight * 0.7, // para ver el efecto fade claramente
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20, // Opcional: para estética
    // backgroundColor se aplica dinámicamente
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222', // Color de texto que contraste bien
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  paginatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: screenHeight * 0.15, // Posición relativa
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginHorizontal: 8,
  },
  nextButton: {
    position: 'absolute',
    bottom: screenHeight * 0.05, // Posición relativa
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnBoardingFade;
