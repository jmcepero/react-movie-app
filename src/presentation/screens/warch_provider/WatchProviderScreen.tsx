import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {RootStackParams} from '../../navigation/StackNavigation';
import {loadWatchProvidersAsync} from '../../../store/slices/watch_provider/WatchProviderSlice';
import {SectionList, StyleSheet, View} from 'react-native';
import {Text} from '@react-native-material/core';
import {LoadingView} from '../../components/base/LoadingView';
import {Toolbar} from '../../components/base/Toolbar';
import {FadeInImage} from '../../components/base/FadeImage';
import LinearGradient from 'react-native-linear-gradient';
import {StackScreenProps} from '@react-navigation/stack';

interface WatchProviderProps
  extends StackScreenProps<RootStackParams, 'WatchProviderScreen'> {}

export const WatchProviderScreen = ({route}: WatchProviderProps) => {
  const {itemId, itemType} = route.params;
  const dispatch = useAppDispatch();
  const {isLoading, watchProvider, error} = useAppSelector(
    state => state.watchProvider,
  );

  useEffect(() => {
    dispatch(loadWatchProvidersAsync({itemId: itemId, itemType: itemType}));
  }, [itemId]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <LoadingView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Toolbar title={'Watch Provider'} />
      <SectionList
        contentContainerStyle={{
          paddingTop: 8,
        }}
        sections={watchProvider}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.providerRow}>
            <FadeInImage
              uri={`https://image.tmdb.org/t/p/w500${item.logoPath}`}
              style={styles.logo}
            />
            <Text style={styles.providerName}>{item.providerName}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.headerContainer}>
            <LinearGradient
              style={styles.gradient}
              colors={['#392c3e', 'transparent']}
              useAngle={true}
              angle={90}
              angleCenter={{x: 0.5, y: 1}}
            />
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Archivo-Black',
    fontSize: 22,
    color: 'rgba(251,246,248,0.7)',
    padding: 16,
  },
  button: {
    fontFamily: 'Archivo-Regular',
    fontSize: 16,
    color: '#553081',
    alignSelf: 'center',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 8,
  },
  providerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  providerName: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    color: 'white',
    paddingHorizontal: 8,
  },
});
