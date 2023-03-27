import React from 'react'
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { CustomImage } from '../base/CustomImage';
import { CustomGenre } from '../../interfaces/CustomGenres';

interface Props {
    genere: CustomGenre
}

export const GenreCard = ({ genere }: Props) => {
    return (
        <View>
            <CustomImage width={160} height={160} localUri={genere.image} />
            <Text style={styles.genereTitle}>{genere.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    genereTitle: {
        fontFamily: 'ArchivoBlack',
        fontSize: 12,
        color: 'rgba(251,246,248,1)',
        marginHorizontal: 4,
        marginTop: 6
    },
});
