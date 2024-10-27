import {RegionsResponse} from '..';
import {Regions} from '../../../domain/regions';

export const regionsResponseToDomain = (
  regionsResponse: RegionsResponse,
): Regions => {
  return {
    results: regionsResponse.results.map(value => ({
      iso_3166_1: value.iso_3166_1,
      english_name: value.english_name,
    })),
  };
};
