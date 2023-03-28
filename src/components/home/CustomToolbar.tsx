import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Images } from '../../../assets/images/Images.index';

export const CustomToolbar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hi, Welcome!</Text>
            <Image style={styles.avatar} source={Images.user} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        marginTop: 8
    },
    title: {
        fontFamily: 'Archivo-Regular',
        fontSize: 36,
        color: 'white',
    },
    avatar: {
        borderRadius: 100,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }
});
