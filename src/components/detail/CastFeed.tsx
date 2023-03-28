import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Cast } from '../../interfaces/MovieInterface';
import { CastCard } from './CastCard';

interface Props {
    width: number,
    casts: Cast[]
}

export const CastFeed = ({ width, casts }: Props) => {
    return (
        <View>
            <Text style={styles.headerText}>Cast</Text>
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 8
                }}
                data={casts}
                renderItem={({ index }) => (
                    <View style={{
                        paddingVertical: 8,
                        paddingHorizontal: 8
                    }}>
                        <CastCard cast={casts[index]} width={width} height={150} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        paddingHorizontal: 16,
        fontFamily: 'Archivo-Medium',
        fontSize: 20,
        color: '#fbf6f8',
        marginTop: 8
    }
});
