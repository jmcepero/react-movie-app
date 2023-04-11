import moment from 'moment';
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MovieResponse } from '../../data/movie/entities/MovieInterface';
import { Movie } from '../../domain/movie/entities/Movies';
import { ValorationView } from './base/ValorationView';
import { CardType, MovieCard } from './MovieCard';

interface Props {
    title?: string,
    movies: Movie[],
    onMovieClicked: (movie: Movie) => void,
    onSeeAllClicked?: () => void
}

export const HorizontalFeed = ({ title, movies, onMovieClicked, onSeeAllClicked }: Props) => {
    return (
        <View>
            {
                title && (
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>{title}</Text>
                        <TouchableOpacity onPress={() => onSeeAllClicked?.()}>
                            <Text style={styles.button}>See all</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 8
                }}
                data={movies}
                renderItem={
                    ({ index }) => (
                        <View style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8
                        }}>
                            <MovieCard
                                movie={movies[index]}
                                width={160}
                                height={220}
                                type={CardType.Feed}
                                onClick={(movie) => onMovieClicked(movie)}
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
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        marginHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
});
