import moment from 'moment';
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../interfaces/MovieInterface';
import { ValorationView } from './base/ValorationView';
import { CardType, MovieCard } from './MovieCard';

interface Props {
    title?: string,
    movies: Movie[],
    onMovieClicked: (movie: Movie) => void
}

export const HorizontalFeed = ({ title, movies, onMovieClicked }: Props) => {
    return (
        <View>
            {
                title && (
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>{title}</Text>
                        <Text style={styles.button}>See all</Text>
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
                                <ValorationView average={movies[index].vote_average} iconSize={12} />
                            </View>

                            <Text style={styles.yearTitle}>{new Date(movies[index]?.release_date || '').getFullYear()}</Text>

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
        fontFamily: 'ArchivoRegular',
        fontSize: 18,
        color: 'rgba(251,246,248,0.7)',
    },
    button: {
        fontFamily: 'ArchivoRegular',
        fontSize: 16,
        color: '#553081',
        alignSelf: 'center'
    },
    movieTitle: {
        fontFamily: 'ArchivoBlack',
        fontSize: 12,
        color: 'rgba(251,246,248,1)',
    },
    yearTitle: {
        fontFamily: 'ArchivoThin',
        fontSize: 12,
        color: 'rgba(251,246,248,0.7)',
        marginHorizontal: 4,
    }
});
