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

export interface Valoration {
  id: number;
  label: string;
  value: number[];
}

export const valorations: Valoration[] = [
  {
    id: 1,
    label: 'Obra de arte 😍',
    value: [8, 10],
  },
  {
    id: 2,
    label: 'Buena 😎',
    value: [6, 7.99],
  },
  {
    id: 3,
    label: 'Normal 🙂',
    value: [1, 5.99],
  },
];

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in cursus dolor. Aliquam quis felis at justo consequat bibendum nec nec turpis. Suspendisse lacinia felis vel nisl blandit suscipit. Morbi id faucibus tortor, eu vulputate felis. Proin congue purus ac sem auctor venenatis. Proin egestas lectus sed mauris iaculis accumsan. Aenean id lectus lacinia, pulvinar purus et, ornare metus. Etiam lacus nunc, rhoncus pharetra quam a, iaculis maximus dui. Fusce ac faucibus felis. Quisque et ullamcorper metus. Suspendisse ullamcorper in odio vitae laoreet. Ut ullamcorper ipsum at ante viverra lobortis. Sed accumsan sagittis gravida. Proin et tortor eget metus tincidunt rhoncus. Cras id magna at lacus mollis consectetur. Vestibulum suscipit congue nibh, sed dapibus neque finibus id. Quisque eget quam sit amet orci interdum finibus. Aenean rutrum, nunc vel pellentesque vehicula, augue augue rhoncus erat, sit amet mattis neque magna in nunc. Phasellus cursus laoreet arcu, nec dictum velit malesuada eget. Morbi venenatis commodo sem ac tristique. Phasellus et justo eros. Vestibulum cursus consectetur velit sit amet bibendum. Donec facilisis venenatis purus vitae pharetra. Maecenas sagittis ante a augue blandit lacinia. Integer cursus nec est ut suscipit. Fusce turpis tortor, laoreet a hendrerit sit amet, semper ac dui. Phasellus eget metus ac tellus pulvinar vestibulum. Nunc quam diam, eleifend in enim quis, pharetra molestie dui. Etiam lobortis sed arcu at ultricies. Etiam hendrerit a metus ut sagittis. Aenean eget lectus elementum, pellentesque velit a, venenatis ex. Cras facilisis imperdiet odio, a ornare eros mattis vitae. Curabitur sit amet hendrerit eros. Nulla bibendum enim dui, ut euismod velit consectetur sed. Pellentesque aliquam massa massa, sit amet facilisis diam semper eu. Quisque fermentum urna et euismod rutrum. Donec mollis nunc vitae sem elementum, et iaculis massa congue. Sed non suscipit tortor, ut sodales justo.';
