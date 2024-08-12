import {Place} from '../../domain/places/entities/PlacesInterface';
import {placesRemoteDataSource} from './remote/PlacesRemoteDataSource';

export interface PlacesDataSource {
  getNearbyCinemas(latitude: number, longitude: number): Promise<Place[]>;
}

export const placesRepository: PlacesDataSource = {
  getNearbyCinemas: async function (
    latitude: number,
    longitude: number,
  ): Promise<Place[]> {
    const result = await placesRemoteDataSource.getNearbyCinemas(
      latitude,
      longitude,
    );

    const placeDetailPromises = result.map(cinema =>
      placesRemoteDataSource.getCinemaDetail(cinema.id),
    );

    const placesDetails = await Promise.all(placeDetailPromises);

    return placesDetails
      .filter(details => details !== null && /cine|ciné/i.test(details.name))
      .map(placeResponse => ({
        ...placeResponse,
        address: splitAddress(placeResponse.address),
      }));
  },
};

const splitAddress = (address: string): string => {
  const addressPart = address.split(',');
  if (addressPart.length > 2) {
    const withCountryRemoved = addressPart.slice(0, -2);
    return withCountryRemoved.join(', ');
  } else {
    return address;
  }
};
