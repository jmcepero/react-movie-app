import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MobXProviderContext, observer } from 'mobx-react';
import TMDBAccountStore from '@presentation/screens/preferences/store/TMDBAccountStore';
import TMDBBottomSheet from '../modals/TMDBBottomSheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';

type Props = PropsWithChildren<{}>;

export const TMDBModalOrchestrator = observer(({ children }: Props) => {
  const { tmdbAccountStore } = useContext(MobXProviderContext) as {
    tmdbAccountStore: TMDBAccountStore;
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (tmdbAccountStore.showModal) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [tmdbAccountStore.showModal]);

  useEffect(() => {
    if (tmdbAccountStore.tmdbRequestToken) {
      navigation.navigate('TMDBWebviewScreen', {
        requestToken: tmdbAccountStore.tmdbRequestToken,
      });
    }
  }, [tmdbAccountStore.tmdbRequestToken]);

  useEffect(() => {
    if (tmdbAccountStore.tmdbSessionId) {
      tmdbAccountStore.onModalDismissed();
    }
  }, [tmdbAccountStore.tmdbSessionId]);

  return (
    <>
      {/* Renderiza los hijos (la pantalla) sin modificarlos */}
      {children}

      {/* El BottomSheet vive aquí, como un hermano de la pantalla */}
      <TMDBBottomSheet
        ref={bottomSheetModalRef}
        onDismiss={() => tmdbAccountStore.onModalDismissed()}
        onPositiveButtonClicked={() => {
          tmdbAccountStore.onConnectToTMDBClicked();
        }}
        loading={tmdbAccountStore.loading}
      />
    </>
  );
});
