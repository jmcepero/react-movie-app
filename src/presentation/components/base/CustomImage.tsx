import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
    width: number,
    height: number,
    uri?: string,
    localUri: any,
    gradientStar?: string,
    gradientEnd?: string
}

export const CustomImage = ({ width, height, uri, localUri, gradientStar = '#211920', gradientEnd = '#382c3e' }: Props) => {
    return (
        <View>
            <LinearGradient style={styles.gradient} colors={[gradientStar, gradientEnd]} />
            <Image source={
                uri ? { uri } : localUri
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
