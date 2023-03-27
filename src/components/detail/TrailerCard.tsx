import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

interface Props {
    trailerUri: string
}

export const TrailerCard = ({ trailerUri }: Props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Trailer</Text>
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={200}
                    videoId={trailerUri}
                    webViewStyle={{
                        opacity: 0.99,
                    }}
                    webViewProps={
                        {
                            androidLayerType: Platform.OS === "android" && Platform.Version <= 22 ? "hardware" : "none"
                        }
                    }
                    initialPlayerParams={{
                        preventFullScreen: true
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    videoContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        marginVertical: 8
    },
    headerText: {
        fontFamily: 'ArchivoMedium',
        fontSize: 20,
        color: 'white',
        marginTop: 8
    }
});

