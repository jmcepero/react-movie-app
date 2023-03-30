import React from 'react'
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';

interface Props {
    year: string,
    director: string
}

export const YearDirector = ({year, director}: Props) => {
    return (
       <View>
        <Text style={styles.text}>{year}, {director}</Text>
       </View>
    )
}

const styles = StyleSheet.create({
    text: {
        paddingHorizontal: 16,
        fontFamily: 'Archivo-Thin',
        fontSize: 14,
        color: '#988396'
    }
});
