import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name='search-outline' size={22} />
            <Text style={styles.text}>Search</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#382c3e',
        padding: 14,
        borderRadius: 16,
        marginHorizontal: 16,
        alignItems: 'center'
    },
    icon: {
        color: '#988396'
    },
    text: {
        fontFamily: 'ArchivoRegular',
        fontSize: 14,
        color: '#988396',
        marginHorizontal: 8
    }
});
