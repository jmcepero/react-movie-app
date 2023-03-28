import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { HorizontalFeed } from '../components/HorizontalFeed';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomToolbar } from '../components/home/CustomToolbar';
import { SearchBar } from '../components/home/SearchBar';
import { MainCarousel } from '../components/home/MainCarousel';
import { GenresFeed } from '../components/home/GenresFeed';
import LoadingView from '../components/base/LoadingView';

export const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { isLoading, nowPlaying, popular, topRated, genres } = useMovies();

    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <LoadingView />
        </View>
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80, backgroundColor: 'rgba(23, 24, 27, 1)' }}>
            <View>
                {/* Toolbar Section */}
                <CustomToolbar />

                {/* Search Section */}
                <SearchBar />

                {/* Main Corousel */}
                <MainCarousel
                    movies={nowPlaying}
                    onMovieClicked={(movie) => navigation.navigate('DetailScreen', movie)} />

                {/* Popular */}
                <HorizontalFeed
                    title='Popular'
                    movies={popular} onMovieClicked={(movie) => navigation.navigate('DetailScreen', movie)} />

                {/* Generes */}
                <GenresFeed genres={genres} />

                {/* Top Rated */}
                <HorizontalFeed
                    title='Top Rated' movies={topRated}
                    onMovieClicked={(movie) => navigation.navigate('DetailScreen', movie)} />


            </View >
        </ScrollView>
    )
}