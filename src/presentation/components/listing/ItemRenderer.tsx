import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Item} from '../../../domain/base/Item';
import {Movie} from '../../../domain/movie/entities/Movies';
import MovieItem from './MovieItem';
import {ParamListBase} from '@react-navigation/native';
import {TVShow} from '../../../domain/tv_shows/entities/TVShows';
import {TVShowItem} from '../../screens/tv_show/components/TVShowItem';
import {fractionWidth} from '../../utils/Dimen';
import {People} from '../../../domain/people/entities/People';
import PeopleItem from './PeopleItem';

const ItemRenderer: React.FC<{
  item: Item;
  navigation: StackNavigationProp<ParamListBase>;
}> = ({item, navigation}) => {
  if ((item as Movie).title) {
    return (
      <MovieItem
        movie={item as Movie}
        onClick={_ => navigation.navigate('DetailScreen', item as Movie)}
        width={fractionWidth}
      />
    );
  } else if ((item as TVShow).firstAirDate) {
    return (
      <TVShowItem
        tvShow={item as TVShow}
        onTVShowClicked={_ =>
          navigation.navigate('TVShowDetailScreen', {
            tvShowId: (item as TVShow).id,
          })
        }
        width={fractionWidth}
      />
    );
  } else if ((item as People).known_for) {
    return (
      <PeopleItem
        people={item as People}
        onClick={_ =>
          navigation.navigate('PersonDetailScreen', {
            personId: (item as People).id,
          })
        }
        width={fractionWidth}
      />
    );
  }
};

export default ItemRenderer;
