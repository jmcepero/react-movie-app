import axios from 'axios';
import {
  PlaceDetailsResponse,
  PlacesResponse,
} from '../entities/PlacesInterface';
import {googleKey} from '../../../presentation/utils/GoogleMapHelper';

export interface PlacesRemoteDataSource {
  getNearbyCinemas(
    latitude: number,
    longitude: number,
  ): Promise<PlacesResponse[]>;
  getCinemaDetail(placeId: string): Promise<PlaceDetailsResponse>;
}

export const placesRemoteDataSource: PlacesRemoteDataSource = {
  getNearbyCinemas: async function (
    latitude: number,
    longitude: number,
  ): Promise<PlacesResponse[]> {
    const radius = 10000; // 10 km

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${latitude},${longitude}`,
          radius: radius,
          types: 'movie_theater',
          key: googleKey,
        },
      },
    );
    const places: PlacesResponse[] = response.data.results.map(
      (place: any) => ({
        id: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }),
    );
    return places;
  },
  getCinemaDetail: async function (
    placeId: string,
  ): Promise<PlaceDetailsResponse> {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleKey}`,
    );
    const result = response.data.result;

    const photoReference = result.photos
      ? result.photos[0].photo_reference
      : null;
    const photoUrl = photoReference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleKey}`
      : '';

    return {
      id: result.place_id,
      name: result.name,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      address: result.formatted_address,
      photoUrl: photoUrl,
      openingHours: result.opening_hours
        ? result.opening_hours.weekday_text
        : [],
      rating: result.rating,
    };
  },
};
