import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Toolbar} from '../base/Toolbar';
import WebView from 'react-native-webview';
import {ActivityIndicator} from '@react-native-material/core';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TMDBWebviewStore from './TMDBWebviewStore';
import {MobXProviderContext} from 'mobx-react';

export interface TMDBWebviewProps {
  requestToken: string;
}

const TMDB_AUTHENTICATE_URL_BASE = 'https://www.themoviedb.org/authenticate/';

const TMDBWebviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {tmdbWebviewStore} = useContext(MobXProviderContext) as {
    tmdbWebviewStore: TMDBWebviewStore;
  };

  const {requestToken} = route.params as TMDBWebviewProps;

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    const {url, loading} = newNavState;
    if (loading || !requestToken) return;

    if (url.includes(requestToken) && url.endsWith('/allow')) {
      tmdbWebviewStore.setResult('allowed');
      navigation.goBack();
    } else if (url.includes(requestToken) && url.endsWith('/deny')) {
      tmdbWebviewStore.setResult('denied');
      navigation.goBack();
    }
  };

  const handleToolbarBackPress = () => {
    tmdbWebviewStore.setResult('cancelled_by_user');
    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      tmdbWebviewStore.onBackPressed();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Toolbar
        title="Connect to TMDB"
        showBackArrow={true}
        onBackArrowPress={handleToolbarBackPress}
      />
      <WebView
        source={{uri: `${TMDB_AUTHENTICATE_URL_BASE}${requestToken}`}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        style={{flex: 1}}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.centeredAbsolute}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
      />
    </View>
  );
};

export default TMDBWebviewScreen;

const styles = StyleSheet.create({
  centeredAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
