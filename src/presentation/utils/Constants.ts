import {Platform} from 'react-native';

export const NO_DESCRIPTION_TEXT =
  "We don't have an overview translated in English. Help us expand our database by adding one.";

export interface SearchOption {
  index: number;
  label: string;
}

export const movieOption = {
  index: 0,
  label: 'Movies',
};

export const tvShowOption = {
  index: 1,
  label: 'TvShows',
};

export const personOption = {
  index: 2,
  label: 'Person',
};

export const searchesOptions: SearchOption[] = [
  movieOption,
  tvShowOption,
  personOption,
];

export const isIOS = () => {
  return Platform.OS === 'ios';
};
