import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spacer, Text } from '@react-native-material/core';

interface Props {
    title: string,
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const Toolbar = ({ title }: Props) => {

    const navigation = useNavigation()

    return (
        <View style={customStyle.row}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={customStyle.button}>
                <Icon color={'white'} name='arrow-back-outline' size={28} />
            </TouchableOpacity>
            <Text style={customStyle.title}>{title}</Text>
            <View style={{
                width: 40,
            }} />
        </View>
    )
}

const customStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: APPBAR_HEIGHT
    },
    button: {
        padding: 8
    },
    title: {
        flex: 1,
        fontFamily: 'Archivo-Black',
        fontSize: 22,
        alignSelf: 'center',
        color: 'white',
        textAlign: 'center'
    }
});
