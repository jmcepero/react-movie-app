import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Genre } from '../../interfaces/MovieInterface';
import { GenreCard } from './GenreCard';
import { CustomGenre } from '../../interfaces/CustomGenres';

interface Props {
    genres: CustomGenre[]
}

export const GenresFeed = ({ genres }: Props) => {
    return (
        <View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Genres</Text>
                <Text style={styles.button}>See all</Text>
            </View>

            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 8
                }}
                data={genres}
                renderItem={
                    ({ index }) => (
                        <View style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8
                        }}>
                            <GenreCard genere={genres[index]} />
                        </View>
                    )
                }
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 26,
        marginHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontFamily: 'ArchivoRegular',
        fontSize: 18,
        color: 'rgba(251,246,248,0.7)',
    },
    button: {
        fontFamily: 'ArchivoRegular',
        fontSize: 16,
        color: '#553081',
        alignSelf: 'center'
    },
    movieTitle: {
        fontFamily: 'ArchivoBlack',
        fontSize: 12,
        color: 'rgba(251,246,248,1)',
    },
    yearTitle: {
        fontFamily: 'ArchivoThin',
        fontSize: 12,
        color: 'rgba(251,246,248,0.7)',
        marginHorizontal: 4,
    }
});
