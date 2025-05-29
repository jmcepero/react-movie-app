// stores/RootStore.ts

import MovieListingStore from '../screens/movies/store/MovieListingStore';
import AuthStore from '../screens/auth/store/AuthStore';
import ExploreStore from '../screens/explore/store/ExploreStore';
import MovieStore from '../screens/home/store/MovieStore';
import GenreStore from '../screens/onboading/store/GenreStore';
import PersonStore from '../screens/person/store/PersonStore';
import SearchStore from '../screens/search/store/SearchStore';
import TvShowDetailStore from '../screens/tv_show/store/TvShowDetailStore';
import {FilterChipsStore} from '../screens/filter/store/FilterChipsStore';
import MovieFilterStore from '../screens/filter/store/MovieFilterStore';
import {TVShowStore} from '../screens/tv_show/store/TvShowStore';

class RootStore {
  searchStore: SearchStore;
  tvShowDetailStore: TvShowDetailStore;
  personStore: PersonStore;
  exploreStore: ExploreStore;
  authStore: AuthStore;
  genreStore: GenreStore;
  movieStore: MovieStore;
  movieListingStore: MovieListingStore;
  filterChipsStore: FilterChipsStore;
  movieFilterStore: MovieFilterStore;
  tvShowStore: TVShowStore;

  constructor() {
    this.authStore = new AuthStore();
    this.searchStore = new SearchStore();
    this.tvShowDetailStore = new TvShowDetailStore();
    this.personStore = new PersonStore();
    this.exploreStore = new ExploreStore();
    this.genreStore = new GenreStore();
    this.movieStore = new MovieStore();
    this.movieListingStore = new MovieListingStore();
    this.filterChipsStore = new FilterChipsStore();
    this.movieFilterStore = new MovieFilterStore(this.filterChipsStore);
    this.tvShowStore = new TVShowStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
