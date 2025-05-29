import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Review } from '../../../domain/movie/entities/Movies';
import { ReviewCard } from './ReviewCard';

interface Props {
    reviews?: Review[]
}

export const ReviewFeed = ({ reviews }: Props) => {
    return reviews !== undefined && reviews.length > 0 ?
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
        fontFamily: 'Archivo-Medium',
        fontSize: 20,
        color: 'white',
        marginTop: 8
    }
});
