import {Images} from '../../../../../assets/images/Images.index';

export const EMPTY_STATES = {
  UNDER_CONSTRUCTION: {
    image: Images.underConstruction,
    title: 'Construction Zone 🚧',
    subtitle:
      'Our hard-hat hamsters are still building this page!\nCheck back soon for something awesome.',
  },

  CONNECTION_LOST: {
    image: Images.conexionLost,
    title: 'Oops!!',
    subtitle:
      'Seems your internet took a coffee break ☕️\nCheck your network and give it a nudge!',
    buttonLabel: 'Retry Connection',
  },

  NO_RESULTS: {
    image: Images.noResult,
    title: 'No Results',
    subtitle:
      'Sorry, there are no results for this search.\nPlease try another phrase',
  },
};
