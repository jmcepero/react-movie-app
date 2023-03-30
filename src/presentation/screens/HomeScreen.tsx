import React from 'react';
import { View } from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingView from '../components/base/LoadingView';
import { CustomToolbar } from '../components/home/CustomToolbar';
import { GenresFeed } from '../components/home/GenresFeed';
import { MainCarousel } from '../components/home/MainCarousel';
import { HorizontalFeed } from '../components/HorizontalFeed';
import { SearchBar } from '../components/home/SearchBar';
import { Snackbar } from '@react-native-material/core';

export const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { isLoading, nowPlaying, popular, topRated, genres, errorMessage } = useMovies();

    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <LoadingView />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
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

            {
                errorMessage && <Snackbar
                    message={errorMessage}
                    style={{
                        position: "absolute",
                        start: 16,
                        end: 16,
                        bottom: 90,
                    }}
                />
            }


        </View>
    )
}