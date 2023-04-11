import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    average?: number | null,
    iconSize: number 
}

export const ValorationView = ({average, iconSize} : Props) => {
    return (
        <View style={styles.valorationContainer}>
            <Text style={styles.valorationTitle}>{average?.toFixed(1) || 0.0}</Text>
            <Icon name='star' size={iconSize} style={{ color: '#dcb189' }} />
        </View>
    )
}


const styles = StyleSheet.create({
    valorationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4
      },
      valorationTitle: {
        fontFamily: 'Archivo-Regular',
        fontSize: 14,
        color: 'white',
      },
});