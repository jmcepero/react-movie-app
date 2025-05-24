import {Chip} from '../store/FilterChipsStore';

export const defaultSorting: Chip = {
  id: 'popularity.desc',
  label: 'Tendencias',
  isSelected: true,
};

export const sortingValues: Chip[] = [
  defaultSorting,
  {
    id: 'vote_average.desc',
    label: 'Top Valoradas',
    isSelected: false,
    metadata: {id: 'vote_count.gte', value: 500},
  },
  {
    id: 'original_title.asc',
    label: 'A-Z',
    isSelected: false,
  },
  {
    id: 'release_date.desc',
    label: 'Últimos Estrenos',
    isSelected: false,
  },
];
