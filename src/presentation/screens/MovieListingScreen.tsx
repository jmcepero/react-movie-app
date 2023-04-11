import { ActivityIndicator } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LoadingView from '../components/base/LoadingView';
import { Toolbar } from '../components/base/Toolbar';
import { ValorationView } from '../components/base/ValorationView';
import { CardType, MovieCard } from '../components/MovieCard';
import { useMovieListing } from '../hooks/useMovieListing';

export const MovieListingScreen = () => {

    const {width} = Dimensions.get('window')
    const { mainLoading, pageLoading, movies, errorMessage, onReachToEnd } = useMovieListing()
    const navigation = useNavigation()

    if (mainLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <LoadingView />
        </View>
    }

    return (
        <View style={styles.container}>
            <Toolbar title='Popular' />
            <FlatList
                data={movies}
                showsVerticalScrollIndicator={false}
                renderItem={
                    ({ index }) => (
                        <View style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8
                        }}>
                            <MovieCard
                                movie={movies[index]}
                                width={width*0.46}
                                height={220}
                                type={CardType.Feed}
                                onClick={(movie) => {

                                }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 4,
                                marginTop: 8
                            }}>
                                <Text style={[styles.movieTitle, { width: 90 }]} numberOfLines={1} ellipsizeMode={'tail'}>{movies[index].title}</Text>
                                <ValorationView average={movies[index].voteAverage} iconSize={12} />
                            </View>

                            <Text style={styles.yearTitle}>{new Date(movies[index]?.releaseDate || '').getFullYear()}</Text>

                        </View>
                    )
                }
                numColumns={2}
                keyExtractor={(item, index) => index + item.id.toString()}
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
                    () => onReachToEnd()
                }
            />
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
