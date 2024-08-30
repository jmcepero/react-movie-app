import {action, makeAutoObservable, runInAction} from 'mobx';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {errorHandler} from '../../../base/errorHandler';
import {Place} from '../../../../domain/places/entities/PlacesInterface';
import {getNearbyCinemasUseCase} from '../../../../domain/places/usecase/GetNearbyCinemasUseCase';

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const defaultRegionLocation: Location = {
  latitude: -33.4489,
  longitude: -70.6693,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class ExploreStore {
  location: Location = defaultRegionLocation;
  places: Place[] = [];
  isMapLoading: boolean = true;
  isLoading: boolean = true;
  error: string = '';

  constructor() {
    makeAutoObservable(this, {
      searchTheathers: action,
      requestLocationPermission: action,
    });
  }

  async requestLocationPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } else {
      const permition = await Geolocation.requestAuthorization('always');
      if (permition === 'granted') {
        this.getCurrentLocation();
      }
    }
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        runInAction(() => {
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
        });

        // Get Nearby Places
        this.searchTheathers();
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  onMapReady() {
    this.isMapLoading = false;
    this.requestLocationPermission();
  }

  async searchTheathers() {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      let res = await getNearbyCinemasUseCase.execute(
        this.location.latitude,
        this.location.longitude,
      );
      runInAction(() => {
        this.places = res.map(item => {
          const distance = this.calculateDistance(
            this.location.latitude,
            this.location.longitude,
            item.latitude,
            item.longitude,
          );
          const humanDistance = this.formatDistance(distance);
          item.distance = humanDistance;
          return item;
        });
      });
    } catch (error) {
      const {message} = errorHandler(error);
      this.error = message;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const earthRadiusKm = 6371; // Radio de la Tierra en kilómetros
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadiusKm * c;

    return distanceKm;
  }

  formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
      const distanceMeters = distanceKm * 1000;
      return `${distanceMeters.toFixed(2)}ms.`;
    } else {
      return `${distanceKm.toFixed(2)}kms.`;
    }
  }
}

export default ExploreStore;
