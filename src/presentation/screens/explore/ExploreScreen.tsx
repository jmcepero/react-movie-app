import React, {useContext, useEffect, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from '../../utils/GoogleMapsStyle';
import {MobXProviderContext, observer} from 'mobx-react';
import ExploreStore from './store/ExploreStore';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import {View} from 'react-native';
import {LoadingView} from '../../components/base/LoadingView';
import {Images} from '../../../../assets/images/Images.index';
import {Place} from '../../../domain/places/entities/PlacesInterface';
import {Text} from 'react-native';
import {darkColor, tabColor} from '../../utils/Colors';
import {NativeSyntheticEvent} from 'react-native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_MARGIN = 4;

export const ExploreScreen = observer(() => {
  const {exploreStore} = useContext(MobXProviderContext) as {
    exploreStore: ExploreStore;
  };
  const mapRef = useRef<MapView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    // Calcula el índice del ítem central
    const selectedIndex = Math.floor(
      (contentOffset + viewSize / 2) / (ITEM_WIDTH + ITEM_MARGIN * 2),
    );
    animateToSelectedMarker(exploreStore.places[selectedIndex]);
  };

  const animateToSelectedMarker = (place: Place) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: place.latitude - 0.001, // offset
          longitude: place.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  const renderItem = ({item}: {item: Place}) => (
    <View style={styles.card}>
      <Image
        source={item.photoUrl ? {uri: item.photoUrl} : Images.cinema}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </View>
  );

  useEffect(() => {
    if (exploreStore.location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...exploreStore.location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  }, [exploreStore.location]);

  return (
    <View style={styles.container}>
      {exploreStore.isMapLoading && <LoadingView />}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{...exploreStore.location}}
        onMapReady={() => exploreStore.onMapReady()}>
        <Marker coordinate={{...exploreStore.location}}>
          <Image source={Images.userPin} style={{width: 35, height: 35}} />
        </Marker>

        {exploreStore.places.map(place => (
          <Marker
            key={place.id}
            coordinate={{latitude: place.latitude, longitude: place.longitude}}
            title={place.name}>
            <Image source={Images.pin} style={{width: 35, height: 35}} />
          </Marker>
        ))}
      </MapView>
      <FlatList
        data={exploreStore.places}
        renderItem={renderItem}
        horizontal
        bounces={false}
        snapToAlignment="center"
        snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        onMomentumScrollEnd={handleScroll}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
  card: {
    width: ITEM_WIDTH,
    height: 220,
    padding: 10,
    backgroundColor: darkColor,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: ITEM_MARGIN,
  },
  name: {
    marginTop: 8,
    fontFamily: 'Archivo-Black',
    fontSize: 12,
    color: 'rgba(251,246,248,1)',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 14,
  },
  address: {
    fontFamily: 'Archivo-Regular',
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  hour: {
    fontSize: 16,
  },
});