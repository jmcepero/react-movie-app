import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findMoviesAsync, nextPageAsync } from '../../store/slices/search/SearchSlice';
import { RootState } from '../../store/store';
import { SearchInput } from '../components/base/SearchInput';
import MovieItem from '../components/listing/MovieItem';
import { useNavigation } from '@react-navigation/native';

export const SearchScreen = () => {
    const navigation = useNavigation()
    const width = Dimensions.get('window').width
    const dispatch = useAppDispatch()
    const { result, isLoading, pageLoading, page, error } = useAppSelector((state: RootState) => state.search)
    const [term, setTerm] = useState('');

    useEffect(() => {
        if (term.length >= 3)
            dispatch(findMoviesAsync({ term: term, page: 1 }))
    }, [term])

    const loadMore = () => {
        dispatch(nextPageAsync({ term: term, page: page }))
    }

    return (
        <View style={styles.container}>
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
                        ({ index }) => (
                            <MovieItem movie={result[index]} onClick={
                                (movie) => navigation.navigate('DetailScreen', movie)
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
