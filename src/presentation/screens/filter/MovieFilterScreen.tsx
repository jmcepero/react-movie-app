import {StyleSheet, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import FilterChipsComponent from './component/FilterChipsComponent';
import {darkColor} from '../../utils/Colors';
import RNMovieButton from '../../components/base/RNMovieButton';
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {MobXProviderContext, observer} from 'mobx-react';
import {Movie} from '../../../domain/movie/entities/Movies';
import ItemRenderer from '../../components/listing/ItemRenderer';
import {ListFooterComponent} from '../search/components/ListFooterComponent';
import MovieFilterStore from './store/MovieFilterStore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import VerticalFeedSkeleton from '../../components/base/skeleton/VerticalFeedSkeleton';
import {TouchableWithoutFeedback} from 'react-native';
import {BottomSheetDefaultFooterProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import {Toolbar} from '../../components/base/Toolbar';
import FilterButton from './component/FilterButton';
import {FlashList} from '@shopify/flash-list';
import SortingComponent from './component/SortingComponent';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const MovieFilterScreen = () => {
  const {movieFilterStore} = useContext(MobXProviderContext) as {
    movieFilterStore: MovieFilterStore;
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // Configuración del bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ['70%', '90%']; // Puntos de snap ajustables

  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    {key: 'filters', title: 'Filtros'},
    {key: 'sorting', title: 'Ordenar'},
  ]);

  // Manejar apertura del modal
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  // Manejar cierre del modal
  const handleModalDismiss = () => {
    movieFilterStore.onFilterPanelDismiss();
  };

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
    (props: BottomSheetDefaultFooterProps) => (
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

  const renderMovieItem = useCallback(
    ({item, index}: {item: Movie; index: number}) => (
      <View
        style={{
          marginRight: index % 2 === 0 ? 'auto' : undefined,
          marginLeft: index % 2 === 1 ? 'auto' : undefined,
        }}>
        <ItemRenderer item={item} navigation={navigation} />
      </View>
    ),
    [navigation],
  );

  const FiltersTab = () => (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <FilterChipsComponent />
    </BottomSheetScrollView>
  );

  const SortingTab = () => (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <SortingComponent />
    </BottomSheetScrollView>
  );

  const renderScene = SceneMap({
    filters: FiltersTab,
    sorting: SortingTab,
  });

  useEffect(() => {
    movieFilterStore.onScreenLoaded();
    return () => {
      movieFilterStore.resetAllStates();
    };
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Toolbar
          title={'Discover'}
          rightComponent={
            <FilterButton
              onFilterClicked={handlePresentModalPress}
              customStyle={styles.filterButton}
              isFilterActive={movieFilterStore.filterActive}
            />
          }
        />

        {!movieFilterStore.isLoading ? (
          <FlashList
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            estimatedItemSize={220}
            data={movieFilterStore.filteringResult as Movie[]}
            showsVerticalScrollIndicator={false}
            renderItem={renderMovieItem}
            numColumns={2}
            keyExtractor={(item, _) => item.title}
            ListFooterComponent={
              <ListFooterComponent
                isLoading={movieFilterStore.pageLoading}
                hasError={movieFilterStore.error.length > 0}
              />
            }
            onEndReachedThreshold={0.5}
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
          backdropComponent={renderBackdrop}
          onDismiss={handleModalDismiss}>
          {/* Contenido scrollable */}

          <TabView
            navigationState={{index: tabIndex, routes}}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{backgroundColor: 'white'}}
                style={{backgroundColor: darkColor}}
              />
            )}
          />
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
    paddingTop: 8,
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
  filterButton: {
    paddingHorizontal: 12,
    height: 32,
    marginEnd: 8,
    borderRadius: 8,
  },
});
