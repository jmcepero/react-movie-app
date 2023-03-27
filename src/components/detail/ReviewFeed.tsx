import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Review } from '../../interfaces/MovieInterface';
import { CastCard } from './CastCard';
import { ReviewCard } from './ReviewCard';

interface Props {
    reviews: Review[]
}

export const ReviewFeed = ({ reviews }: Props) => {
    return reviews.length > 0 ?
        <View style={styles.container}>
            <Text style={styles.headerText}>Comments</Text>
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 8
                }}
                data={reviews}
                renderItem={({ index }) => (
                    <View style={{
                        paddingVertical: 8,
                        paddingHorizontal: 8
                    }}>
                        <ReviewCard review={reviews[index]} />
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        : <></>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8
    },
    headerText: {
        paddingHorizontal: 16,
        fontFamily: 'ArchivoMedium',
        fontSize: 20,
        color: 'white',
        marginTop: 8
    }
});
