import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Movie } from '../../../../domain/movie/entities/Movies';
import { Text } from '@react-native-material/core';
import { strDateToYear } from '../../../extensions/StringDate';
import { TVShow } from '../../../../domain/tv_shows/entities/TVShows';
import { MovieCard } from '../../../components/MovieCard';
import { ValorationView } from '../../../components/base/ValorationView';

interface MainCarouselItemProps {
    tvShow: TVShow;
    cardWidth: number;
    onTvShowClicked: (tvShow: TVShow) => void;
}

export const TVShowCarouselItem = ({ tvShow, onTvShowClicked, cardWidth }: MainCarouselItemProps) => {
    return (
        <View style={customStyle.container}>
            <MovieCard
                imageID={{
                    backdropPath: tvShow.backdropPath,
                    posterPath: tvShow.posterPath
                }}
                width={cardWidth}
                onClick={() => onTvShowClicked(tvShow)}
            />
            <View style={customStyle.infoContainer}>
                <View style={customStyle.titleContainer}>
                    <Text style={customStyle.movieTitle} numberOfLines={1} ellipsizeMode='tail'>{tvShow.name}</Text>
                    <Text style={customStyle.yearTitle}>{strDateToYear(tvShow.firstAirDate)}</Text>
                </View>
                <ValorationView average={tvShow.voteAverage} iconSize={12} />
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