import React from 'react'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ImageStyle, ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { Image, StyleSheet, View } from 'react-native'
import { Images } from '../../../assets/images/Images.index'

interface Props {
    uri: string,
    imageStyle?: StyleProp<ImageStyle>,
    containerStyle?: StyleProp<ViewStyle>
}

export const RoundImage = ({ uri, imageStyle, containerStyle }: Props) => {
    return (
        <View style={containerStyle}>
            <Image
                source={Images.gradient}
                style={styles.placeHolder}
            />
             <Image
                source={{uri: uri}}
                style={[styles.image, imageStyle]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    placeHolder: {
        position: 'absolute',
        borderRadius: 100,
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    image: {
        borderRadius: 100,
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
});
