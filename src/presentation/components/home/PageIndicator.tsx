import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
    currentIndex: number,
    pageCount: number
}

export const PageIndicator = ({ currentIndex, pageCount }: Props) => {

    return (
        <View style={styles.container}>
            {
                Array.from({ length: pageCount }, (_, index) =>
                    <View key={index} style={{
                        ...styles.indicator,
                        backgroundColor: index === currentIndex ? '#988397' : '#544558'
                    }}></View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#382d3c',
        gap: 5,
        alignSelf: 'center'
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 50
    }
});
