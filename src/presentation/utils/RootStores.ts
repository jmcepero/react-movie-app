// stores/RootStore.ts

import PersonStore from '../screens/person/store/PersonStore';
import SearchStore from '../screens/search/store/SearchStore';
import TvShowStore from '../screens/tv_show/store/TvShowStore';

class RootStore {
  searchStore: SearchStore;
  tvShowStore: TvShowStore;
  personStore: PersonStore;

  constructor() {
    this.searchStore = new SearchStore();
    this.tvShowStore = new TvShowStore();
    this.personStore = new PersonStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
