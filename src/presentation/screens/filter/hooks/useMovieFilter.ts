import {useContext, useEffect, useRef, useCallback} from 'react';
import {MobXProviderContext} from 'mobx-react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import MovieFilterStore from '../store/MovieFilterStore';
import {Movie} from '../../../../domain/movie/entities/Movies';

export const useMovieFilter = () => {
  const {movieFilterStore} = useContext(MobXProviderContext) as {
    movieFilterStore: MovieFilterStore;
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Manejar apertura del modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Manejar cierre del modal
  const handleModalDismiss = useCallback(() => {
    movieFilterStore.onFilterPanelDismiss();
  }, [movieFilterStore]);

  // Aplicar filtros
  const handleApplyFilter = useCallback(() => {
    movieFilterStore.onButtonApplyClicked();
  }, [movieFilterStore]);

  // Resetear filtros
  const handleResetFilter = useCallback(() => {
    movieFilterStore.onResetFilterClicked();
  }, [movieFilterStore]);

  const handleOnReachToEnd = useCallback(() => {
    movieFilterStore.onReachToEnd();
  }, [movieFilterStore]);

  // Render item de película
  const renderMovieItem = useCallback(
    ({item, index}: {item: Movie; index: number}) => ({
      item,
      index,
    }),
    [],
  );

  // Cargar datos al montar
  useEffect(() => {
    movieFilterStore.onScreenLoaded();
    return () => {
      movieFilterStore.resetAllStates();
    };
  }, [movieFilterStore]);

  return {
    movieFilterStore,
    bottomSheetModalRef,
    handlePresentModalPress,
    handleModalDismiss,
    handleApplyFilter,
    handleResetFilter,
    handleOnReachToEnd,
    renderMovieItem,
  };
};
