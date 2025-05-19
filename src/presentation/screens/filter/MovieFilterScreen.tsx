import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {JSX, useCallback, useContext, useEffect, useRef} from 'react';
import AccordionComponent from './component/AccordionComponent';
import {darkColor} from '../../utils/Colors';
import RNMovieButton from '../../components/base/RNMovieButton';
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {blue} from 'react-native-reanimated/lib/typescript/Colors';
import {MobXProviderContext, observer} from 'mobx-react';
import {Movie} from '../../../domain/movie/entities/Movies';
import ItemRenderer from '../../components/listing/ItemRenderer';
import MovieListingStore from '../movies/store/MovieListingStore';
import {ListFooterComponent} from '../search/components/ListFooterComponent';
import MovieFilterStore from './store/MovieFilterStore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import {TouchableWithoutFeedback} from 'react-native';

const MovieFilterScreen = () => {
  const {movieFilterStore} = useContext(MobXProviderContext) as {
    movieFilterStore: MovieFilterStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // Configuración del bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ['40%', '90%']; // Puntos de snap ajustables

  // Manejar apertura del modal
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();

  // 1. Crea un componente Backdrop personalizado
  const renderBackdrop = useCallback(
    (props: any) => (
      <TouchableWithoutFeedback
        onPress={() => bottomSheetModalRef.current?.dismiss()}
        style={styles.absoluteFill}>
        <View {...props} style={[props.style, styles.backdrop]} />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  // Footer fijo con el botón
  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props}>
        <View style={styles.footer}>
          <RNMovieButton
            onClick={() => {
              movieFilterStore.onButtonApplyClicked();
              bottomSheetModalRef.current?.dismiss();
            }}
            label="Apply"
          />
        </View>
      </BottomSheetFooter>
    ),
    [],
  );

  useEffect(() => {
    movieFilterStore.onScreenLoaded();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.openButton}>
          <Text>Expand</Text>
        </TouchableOpacity>

        {!movieFilterStore.isLoading ? (
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={movieFilterStore.filteringResult as Movie[]}
            showsVerticalScrollIndicator={false}
            renderItem={({index}) => (
              <ItemRenderer
                item={movieFilterStore.filteringResult[index]}
                navigation={navigation}
              />
            )}
            numColumns={2}
            keyExtractor={(item, _) => item.title}
            ListFooterComponent={
              <ListFooterComponent
                isLoading={movieFilterStore.pageLoading}
                hasError={movieFilterStore.error.length > 0}
              />
            }
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            onEndReached={() => movieFilterStore.onReachToEnd()}
          />
        ) : (
          <VerticalFeedSkeleton isLoading={true} />
        )}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          footerComponent={renderFooter}
          backgroundStyle={{backgroundColor: darkColor}}
          handleIndicatorStyle={{backgroundColor: 'white'}}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}>
          {/* Contenido scrollable */}
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <AccordionComponent />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default observer(MovieFilterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  handleBottomSheet: {
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: 'rgba(24,25,32,1)',
  },
  bottomSheet: {
    backgroundColor: 'rgba(24,25,32,1)',
  },
  buttonApply: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: darkColor,
  },
  openButton: {
    backgroundColor: 'red',
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  buttonContainer: {
    backgroundColor: 'rgba(24,25,32,1)',
  },
  footer: {
    padding: 16,
    backgroundColor: darkColor,
    borderTopWidth: 1,
    borderTopColor: '#ffffff30',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
