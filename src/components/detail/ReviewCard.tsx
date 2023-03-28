import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Review } from '../../interfaces/MovieInterface'
import { RoundImage } from '../base/RoundImage'
import moment from 'moment';

interface Props {
    review: Review
}

const width = Dimensions.get('window').width

export const ReviewCard = ({ review }: Props) => {
    const uri = `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`;
    const date = moment(review.created_at)

    return (
        <View style={styles.container}>
            <View style={styles.rowTitle}>
                <RoundImage uri={uri} containerStyle={styles.roundContainerStyle} />

                <View style={styles.titleAndDate}>
                    <Text style={styles.title}>{review.author_details.username}</Text>
                    <Text style={styles.caption}>{date.format("YYYY, d MMM")}</Text>
                </View>

                <View style={styles.valorationContainer}>
                    <Text style={styles.title}>{ review.author_details.rating?.toFixed(1) || 0.0}</Text>
                    <Icon name="star" size={16} style={styles.icon} />
                </View>
            </View>
            <Text
                numberOfLines={4}
                ellipsizeMode={'tail'}
                style={styles.description}
            >{review.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    roundContainerStyle: {
        marginEnd: 8
    },
    container: {
        backgroundColor: '#382c3e',
        borderRadius: 16,
        overflow: 'hidden',
        padding: 12,
        minHeight: 150,
        width: width * 0.8
    },
    rowTitle: {
        flexDirection: 'row',
    },
    titleAndDate: {
        alignSelf: 'center',
        width: '70%'
    },
    valorationContainer: {
        flexDirection: 'row',
        width: '10%',
        gap: 5,
        justifyContent: 'flex-end',
    },
    image: {
        borderRadius: 100,
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },
    title: {
        fontFamily: 'Archivo-Medium',
        fontSize: 16,
        color: '#988396',
    },
    caption: {
        fontFamily: 'Archivo-Thin',
        fontSize: 14,
        color: '#988396',
    },
    icon: {
        color: '#dcb189',
    },
    description: {
        marginTop: 8,
        fontFamily: 'Archivo-Regular',
        fontSize: 18,
        color: '#988396',
    },
});

