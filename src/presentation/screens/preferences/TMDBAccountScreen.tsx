import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useContext, useEffect, useRef, useCallback} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import TMDBAccountStore from './store/TMDBAccountStore';
import AuthStore from '../auth/store/AuthStore';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import TMDBBottomSheet from '../../components/modals/TMDBBottomSheet'; // Importa el nuevo modal
import RNMovieButton from '../../components/base/RNMovieButton'; // Para el botón de demostración
import {getFontFamily} from '../../utils/Fonts';
import {primaryBlackColor} from '../../utils/Colors';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const TMDBAccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {tmdbAccountStore, authStore} = useContext(MobXProviderContext) as {
    tmdbAccountStore: TMDBAccountStore;
    authStore: AuthStore;
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  useEffect(() => {
    tmdbAccountStore.onScreenLoaded(authStore.user?.uid);
  }, [authStore.user]);

  useEffect(() => {
    if (tmdbAccountStore.tmdbRequestToken) {
      navigation.navigate('TMDBWebviewScreen', {
        requestToken: tmdbAccountStore.tmdbRequestToken,
      });
    }
  }, [tmdbAccountStore.tmdbRequestToken]);

  useEffect(() => {
    if (tmdbAccountStore.tmdbSessionId) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [tmdbAccountStore.tmdbSessionId]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>TMDB Account Screen</Text>
        {/* Botón de ejemplo para abrir el modal */}
        <RNMovieButton
          label="Show How to Earn Points"
          onClick={handlePresentModalPress}
          style={{marginVertical: 20, marginHorizontal: 20}}
        />

        {/* Aquí iría el resto de tu UI para TMDBAccountScreen */}
        {tmdbAccountStore.loading && (
          <Text style={styles.infoText}>Loading TMDB Data...</Text>
        )}
        {tmdbAccountStore.tmdbSessionId && !tmdbAccountStore.loading && (
          <Text style={styles.infoText}>
            Connected to TMDB as: {tmdbAccountStore.tmdbSessionId}
          </Text>
        )}
        {!tmdbAccountStore.tmdbSessionId && !tmdbAccountStore.loading && (
          <Text style={styles.infoText}>Not connected to TMDB.</Text>
        )}
      </View>

      <TMDBBottomSheet
        ref={bottomSheetModalRef}
        onDismiss={handleDismissModalPress}
        onPositiveButtonClicked={() => {
          tmdbAccountStore.onConnectToTMDBClicked();
        }}
        loading={tmdbAccountStore.loading}
      />
    </BottomSheetModalProvider>
  );
};

export default observer(TMDBAccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBlackColor,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  screenTitle: {
    fontSize: 20,
    fontFamily: getFontFamily('bold'),
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontFamily: getFontFamily('normal'),
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
});
