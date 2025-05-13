// stores/RootStore.ts

import MovieListingStore from '../screens/movies/store/MovieListingStore';
import AuthStore from '../screens/auth/store/AuthStore';
import ExploreStore from '../screens/explore/store/ExploreStore';
import MovieStore from '../screens/home/store/MovieStore';
import GenreStore from '../screens/onboading/store/GenreStore';
import PersonStore from '../screens/person/store/PersonStore';
import SearchStore from '../screens/search/store/SearchStore';
import TvShowStore from '../screens/tv_show/store/TvShowStore';
import {AccordionStore} from '../screens/filter/store/AccordionStore';
import MovieFilterStore from '../screens/filter/store/MovieFilterStore';

class RootStore {
  searchStore: SearchStore;
  tvShowStore: TvShowStore;
  personStore: PersonStore;
  exploreStore: ExploreStore;
  authStore: AuthStore;
  genreStore: GenreStore;
  movieStore: MovieStore;
  movieListingStore: MovieListingStore;
  accordionStore: AccordionStore;
  movieFilterStore: MovieFilterStore;

  constructor() {
    this.authStore = new AuthStore();
    this.searchStore = new SearchStore();
    this.tvShowStore = new TvShowStore();
    this.personStore = new PersonStore();
    this.exploreStore = new ExploreStore();
    this.genreStore = new GenreStore();
    this.movieStore = new MovieStore();
    this.movieListingStore = new MovieListingStore();
    this.accordionStore = new AccordionStore();
    this.movieFilterStore = new MovieFilterStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
