import { ActivityIndicator } from '@react-native-material/core';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loadMoviesAsync, nextPageAsync } from '../../../store/slices/listing/ListingSlice';
import { RootState } from '../../../store/store';
import LoadingView from '../../components/base/LoadingView';
import { Toolbar } from '../../components/base/Toolbar';
import MovieItem from '../../components/listing/MovieItem';
import { RootStackParams } from '../../navigation/StackNavigation';
import { Movie } from '../../../domain/movie/entities/Movies';

export interface MovieListingProps extends StackScreenProps<RootStackParams, 'MovieListingScreen'> { }

export const MovieListingScreen = ({ route }: MovieListingProps) => {

    const { category, title } = route.params
    const { width } = Dimensions.get('window')
    const dispatch = useAppDispatch()
    const { result, isLoading, pageLoading, page, error } = useAppSelector((state: RootState) => state.listing)
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

    useEffect(() => {
        dispatch(loadMoviesAsync({ category: category, page: 1 }))
    }, [])

    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <LoadingView />
        </View>
    }

    return (
        <View style={styles.container}>
            <Toolbar title={title} />
            {
                result.length > 0 && <FlatList
                    data={result as Movie[]}
                    showsVerticalScrollIndicator={false}
                    renderItem={
                        ({ index }) => (
                            <MovieItem movie={result[index] as Movie} onClick={
                                (movie) => navigation.navigate('DetailScreen', movie)
                            } />
                        )
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        () => {
                            return (
                                pageLoading ?
                                    (<View style={{
                                        padding: 24,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ActivityIndicator size={16} />
                                    </View>) : <></>
                            );
                        }
                    }
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                    onEndReached={
                        () => dispatch(nextPageAsync({ category: category, page: page }))
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
    movieTitle: {
        fontFamily: 'Archivo-Black',
        fontSize: 12,
        color: 'rgba(251,246,248,1)',
    },
    yearTitle: {
        fontFamily: 'Archivo-Thin',
        fontSize: 12,
        color: 'rgba(251,246,248,0.7)',
        marginHorizontal: 4,
    }
})
