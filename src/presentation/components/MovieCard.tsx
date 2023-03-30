import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Movie } from '../../domain/movie/entities/Movies';

export enum CardType {
    Carousel,
    Feed
}

interface Props {
    movie: Movie,
    width?: number,
    height?: number,
    onClick?: (movie: Movie) => void,
    type?: CardType
}

export const MovieCard = ({ movie, width, height, onClick, type = CardType.Carousel }: Props) => {
    const uri = `https://image.tmdb.org/t/p/${type === CardType.Carousel ? 'original'+movie.backdropPath : 'w500'+movie.posterPath}`;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onClick?.(movie)}
            style={styles.container}>
            <View style={{
                ...styles.imageContainer,
                width: width,
                height: height
            }}>
                <LinearGradient style={[styles.gradient]} colors={['#211920', '#382c3e']} />
                <Image source={{
                    uri: uri
                }} style={styles.image} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
    },
    image: {
        flex: 1,
        borderRadius: 15,
        resizeMode: 'cover'
    },
    gradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 15,
    }
});
