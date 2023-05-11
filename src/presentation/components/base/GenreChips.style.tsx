import { StyleSheet } from "react-native";

export const genereStyle = StyleSheet.create({
    genreContainer: {
        flexDirection: 'row',
        bottom: 0,
        paddingHorizontal: 16,
        paddingBottom: 8,
        gap: 4
    },
    genreChip: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(46,35,49, 0.7)',
        borderRadius: 6
    },
    genreChipTitle: {
        fontFamily: 'Archivo-Thin',
        fontSize: 14,
        color: '#988396'
    },
});