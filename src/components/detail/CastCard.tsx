import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Images } from '../../../assets/images/Images.index'
import { Cast } from '../../interfaces/MovieInterface'

interface Props {
    cast: Cast,
    width?: number,
    height?: number,
    onClick?: (cast: Cast) => void
}

export const CastCard = ({ cast, width, height, onClick }: Props) => {
    const uri = `https://image.tmdb.org/t/p/w500${cast.profile_path}`;

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onClick?.(cast)}
                style={styles.container}>
                <View style={{
                    ...styles.imageContainer,
                    width: width,
                    height: height
                }}>
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            resizeMode: 'cover'
                        }}
                        source={Images.gradient}
                    />
                    <Image
                        source={{
                            uri: uri
                        }}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
            <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{
                    ...styles.caption,
                    width: width
                }}>{cast?.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start'
    },
    imageContainer: {
        flex: 1,
        borderRadius: 12,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        borderRadius: 12,
        resizeMode: 'contain'
    },
    caption: {
        width: '100%',
        fontFamily: 'ArchivoThin',
        fontSize: 14,
        color: '#988396',
        paddingHorizontal: 6,
        paddingVertical: 5
    }
});
