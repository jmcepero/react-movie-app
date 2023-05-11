import { StyleSheet } from "react-native";

export const backButtonStyle = StyleSheet.create({
    buttonSquare: {
        position: 'absolute',
        borderRadius: 8,
        width: 40,
        height: 40,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46,35,49, 0.9)',
        top: 16,
        start: 16
    }
});