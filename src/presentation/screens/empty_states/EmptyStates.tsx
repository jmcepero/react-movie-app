// Para estado en construcción
import {once} from 'mobx/dist/internal';
import {Images} from '../../../../assets/images/Images.index';
import EmptyStateView from './EmptyStateView';

export const UnderConstructionView = () => (
  <EmptyStateView
    image={Images.underConstruction}
    title="Construction Zone 🚧"
    subtitle="Our hard-hat hamsters are still building this page!\nCheck back soon for something awesome."
  />
);

// Para error de conexión (con botón)
export const ConnectionLostView = (onClick: () => void) => (
  <EmptyStateView
    image={Images.conexionLost}
    title="Oops!!"
    subtitle="Seems your internet took a coffee break ☕️\nCheck your network and give it a nudge!"
    buttonLabel="Retry Connection"
    onButtonPress={() => onClick()}
  />
);

// Para búsqueda sin resultados
export const NoResultsView = () => (
  <EmptyStateView
    image={Images.noResult}
    title="No Results"
    subtitle="Sorry, there are no results for this search.\nPlease try another phrase"
  />
);
