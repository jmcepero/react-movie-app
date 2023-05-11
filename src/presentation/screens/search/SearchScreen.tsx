import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, FlatList, ActivityIndicator, BackHandler, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { findMoviesAsync, nextPageAsync, findTVShowsAsync, nextPageTVShowAsync, restoreToDefault } from '../../../store/slices/search/SearchSlice';
import { RootState } from '../../../store/store';
import { SearchInput } from '../../components/base/SearchInput';
import MovieItem from '../../components/listing/MovieItem';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Movie } from '../../../domain/movie/entities/Movies';
import { TVShow } from '../../../domain/tv_shows/entities/TVShows';
import { TVShowItem } from '../tv_show/components/TVShowItem';

export interface SearchScreenProps extends StackScreenProps<RootStackParams, 'SearchScreen'> { }

export const SearchScreen = ({ route }: SearchScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()
    const dispatch = useAppDispatch()
    const { result, isLoading, pageLoading, page, error } = useAppSelector((state: RootState) => state.search)
    const [term, setTerm] = useState('');
    const typeOfSearch = route.params.type

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            dispatch(restoreToDefault())
        })
    }, [])

    useEffect(() => {
        if (typeOfSearch === 'movie') {
            if (term.length >= 3)
                dispatch(findMoviesAsync({ term: term, page: 1 }))
        } else {
            if (term.length >= 3)
                dispatch(findTVShowsAsync({ term: term, page: 1 }))
        }
    }, [term])

    const loadMore = () => {
        if (typeOfSearch === 'movie') {
            dispatch(nextPageAsync({ term: term, page: page }))
        } else {
            dispatch(nextPageTVShowAsync({ term: term, page: 1 }))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 60 }}>{error}</Text>
            <SearchInput onDebounced={setTerm} style={{
                position: 'absolute',
                zIndex: 999
            }} />
            {
                result.length > 0 && <FlatList
                    contentContainerStyle={{
                        paddingTop: 80,
                    }}
                    data={result}
                    showsVerticalScrollIndicator={false}
                    renderItem={
                        ({ index }) => typeOfSearch === 'movie' ? (
                            <MovieItem movie={result[index] as Movie} onClick={
                                (item) => navigation.navigate('DetailScreen', result[index] as Movie)
                            } />
                        ) : (
                            <TVShowItem tvShow={result[index] as TVShow} onTVShowClicked={
                                (item) => navigation.navigate('TVShowDetailScreen', {
                                    tvShowId: (result[index] as TVShow).id
                                })
                            } />
                        )
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        () => {
                            return (
                                pageLoading || error.length > 0 ?
                                    (<View style={{
                                        padding: 24,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ActivityIndicator color={'#7b44c1'} size={16} />
                                    </View>) : <></>
                            );
                        }
                    }
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                    onEndReached={
                        () => {
                            loadMore()
                        }
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        fontFamily: 'Archivo-Regular',
        fontSize: 18,
        color: 'rgba(251,246,248,0.7)',
    },
    button: {
        fontFamily: 'Archivo-Regular',
        fontSize: 16,
        color: '#553081',
        alignSelf: 'center'
    },
})


