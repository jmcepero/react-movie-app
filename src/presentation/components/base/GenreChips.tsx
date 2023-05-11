import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { genres } from '../../../data/genre/local/CustomGenres';
import { BaseGenres } from "../../../domain/tv_shows/entities/TVShows";
import { genereStyle } from "./GenreChips.style";

interface GenreProps {
    genres?: BaseGenres[];
    customStyle?: StyleProp<ViewStyle>;
}

export const GenreChips = ({ genres, customStyle }: GenreProps) => {
    return (
        <View style={[genereStyle.genreContainer, customStyle]}>
            {
                genres?.slice(0, 3).map((item, index) => {
                    return (
                        <View style={genereStyle.genreChip} key={index}>
                            <Text style={genereStyle.genreChipTitle}>{item.name}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}