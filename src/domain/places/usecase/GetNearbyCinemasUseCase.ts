import {Place} from '../entities/PlacesInterface';
import {placesRepository} from '../../../data/places/PlacesRepository';

export const getNearbyCinemasUseCase = {
  async execute(latitude: number, longitude: number): Promise<Place[]> {
    return placesRepository.getNearbyCinemas(latitude, longitude);
  },
};
