import {Images} from '../../../../assets/images/Images.index';

export interface CustomGenre {
  id: number;
  name: string;
  image: any;
}

export const genres: CustomGenre[] = [
  {
    id: 28,
    name: 'Action',
    image: Images.genreAction,
  },
  {
    id: 12,
    name: 'Adventure',
    image: Images.genreAdventure,
  },
  {
    id: 16,
    name: 'Animation',
    image: Images.genreAnimation,
  },
  {
    id: 35,
    name: 'Comedy',
    image: Images.genreComedy,
  },
  {
    id: 80,
    name: 'Crime',
    image: Images.genreCrime,
  },
];
