// stores/RootStore.ts

import AuthStore from '../screens/auth/store/AuthStore';
import ExploreStore from '../screens/explore/store/ExploreStore';
import PersonStore from '../screens/person/store/PersonStore';
import SearchStore from '../screens/search/store/SearchStore';
import TvShowStore from '../screens/tv_show/store/TvShowStore';

class RootStore {
  searchStore: SearchStore;
  tvShowStore: TvShowStore;
  personStore: PersonStore;
  exploreStore: ExploreStore;
  authStore: AuthStore;

  constructor() {
    this.searchStore = new SearchStore();
    this.tvShowStore = new TvShowStore();
    this.personStore = new PersonStore();
    this.exploreStore = new ExploreStore();
    this.authStore = new AuthStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
