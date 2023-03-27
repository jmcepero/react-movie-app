import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
    width: number,
    height: number,
    uri?: string,
    localUri: any
}

export const CustomImage = ({ width, height, uri, localUri }: Props) => {
    return (
        <View>
            <LinearGradient style={styles.gradient} colors={['#211920', '#382c3e']} />
            <Image source={
                uri ? {uri} : localUri
            } style={[styles.image, { width: width, height: height }]} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden'
    },
    gradient: {
        position: 'absolute'
    },
    image: {
        borderRadius: 16,
        resizeMode: 'cover',
    }
});
