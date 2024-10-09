// stores/RootStore.ts

import MovieListingStore from '../screens/movies/store/MovieListingStore';
import AuthStore from '../screens/auth/store/AuthStore';
import ExploreStore from '../screens/explore/store/ExploreStore';
import MovieStore from '../screens/home/store/MovieStore';
import GenreStore from '../screens/onboading/store/GenreStore';
import PersonStore from '../screens/person/store/PersonStore';
import SearchStore from '../screens/search/store/SearchStore';
import TvShowStore from '../screens/tv_show/store/TvShowStore';

class RootStore {
  searchStore: SearchStore;
  tvShowStore: TvShowStore;
  personStore: PersonStore;
  exploreStore: ExploreStore;
  authStore: AuthStore;
  genreStore: GenreStore;
  movieStore: MovieStore;
  movieListingStore: MovieListingStore;

  constructor() {
    this.authStore = new AuthStore();
    this.searchStore = new SearchStore();
    this.tvShowStore = new TvShowStore();
    this.personStore = new PersonStore();
    this.exploreStore = new ExploreStore();
    this.genreStore = new GenreStore();
    this.movieStore = new MovieStore();
    this.movieListingStore = new MovieListingStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
