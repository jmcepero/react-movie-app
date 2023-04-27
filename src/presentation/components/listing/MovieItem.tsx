import React from "react";
import { View, Dimensions, Text } from 'react-native';
import { Movie } from "../../../domain/movie/entities/Movies";
import { strDateToYear } from "../../extensions/StringDate";
import { ValorationView } from "../base/ValorationView";
import { MovieCard } from "../MovieCard";
import { movieStyle } from "./MovieItem.style";

export enum CardType {
    Carousel,
    Feed
}

interface MovieItemProps {
    movie: Movie,
    width?: number,
    height?: number,
    onClick?: (movie: Movie) => void,
    type?: CardType
}

const MovieItem = ({ movie, width = Dimensions.get('window').width, height = 220, onClick, type = CardType.Feed}: MovieItemProps) => {
    return (
        <View style={{
            paddingVertical: 8,
            paddingHorizontal: 8
        }}>
            <MovieCard
                movie={movie}
                width={width * 0.46}
                height={height}
                type={type}
                onClick={(movie) => {
                    onClick?.(movie);
                }}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 4,
                marginTop: 8
            }}>
                <Text style={[movieStyle.movieTitle, { width: 90 }]} numberOfLines={1} ellipsizeMode={'tail'}>{movie.title}</Text>
                <ValorationView average={movie.voteAverage} iconSize={12} />
            </View>

            <Text style={movieStyle.yearTitle}>{strDateToYear(movie.releaseDate)}</Text>

        </View>
    )
}

export default MovieItem;