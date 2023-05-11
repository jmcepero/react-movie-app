import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MovieCard } from '../MovieCard'
import { MainCarousel } from './MainCarousel';
import { Movie } from '../../../domain/movie/entities/Movies';
import { Text } from '@react-native-material/core';
import { ValorationView } from '../base/ValorationView';
import { strDateToYear } from '../../extensions/StringDate';

interface MainCarouselItemProps {
    movie: Movie;
    cardWidth: number;
    onMovieClicked: (movie: Movie) => void;
}

export const MainCorouselItem = ({ movie, onMovieClicked, cardWidth }: MainCarouselItemProps) => {
    return (
        <View style={customStyle.container}>
            <MovieCard
                imageID={{
                    backdropPath: movie.backdropPath,
                    posterPath: movie.posterPath
                }}
                width={cardWidth}
                onClick={() => onMovieClicked(movie)}
            />
            <View style={customStyle.infoContainer}>
                <View style={customStyle.titleContainer}>
                    <Text style={customStyle.movieTitle} numberOfLines={1} ellipsizeMode='tail'>{movie.originalTitle}</Text>
                    <Text style={customStyle.yearTitle}>{strDateToYear(movie.releaseDate)}</Text>
                </View>
                <ValorationView average={movie.voteAverage} iconSize={12} />
            </View>
        </View>
    )
}

const customStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        bottom: 0,
        backgroundColor: 'rgba(32,25,32,0.6)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    titleContainer: {
        flex: 1
    },
    movieTitle: {
        fontFamily: 'Archivo-Black',
        fontSize: 14,
        color: 'rgba(251,246,248,1)',
        marginEnd: 8
    },
    yearTitle: {
        fontFamily: 'Archivo-Thin',
        fontSize: 12,
        color: 'rgba(251,246,248,0.7)',
        marginTop: 4
    }
});