import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomToolbar } from '../../components/home/CustomToolbar';
import { GenresFeed } from '../../components/home/GenresFeed';
import { MainCarousel } from '../../components/home/MainCarousel';
import { HorizontalFeed } from '../../components/HorizontalFeed';
import { SearchBar } from '../../components/home/SearchBar';
import { Snackbar } from '@react-native-material/core';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { loadHomeMoviesAsync } from '../../../store/slices/home/HomeSlice';
import { RefreshControl } from 'react-native-gesture-handler';

export const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const dispatch = useAppDispatch();
    const { isLoading, nowPlaying, popular, topRated, genres, error } = useAppSelector(state => state.home);

    const refreshData = () => {
        dispatch(loadHomeMoviesAsync());
    }

    useEffect(() => {
        refreshData()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80, backgroundColor: 'rgba(23, 24, 27, 1)' }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refreshData} tintColor={'#7B44C1'} />
                }>

                <View>
                    {/* Toolbar Section */}
                    <CustomToolbar title='Movies' />

                    {/* Search Section */}
                    <SearchBar onClick={
                        () => navigation.navigate('SearchScreen', { type: 'movie' })
                    } />

                    {/* Main Corousel */}
                    <MainCarousel
                        movies={nowPlaying}
                        onMovieClicked={(movie) => navigation.navigate('DetailScreen', movie)} />

                    {/* Popular */}
                    <HorizontalFeed
                        title='Popular'
                        movies={popular} onMovieClicked={(movie) => navigation.navigate('DetailScreen', movie)}
                        onSeeAllClicked={() => navigation.navigate(
                            'MovieListingScreen',
                            {
                                category: 'popular',
                                title: 'Popular'
                            }
                        )} />

                    {/* Generes */}
                    <GenresFeed genres={genres} />

                    {/* Top Rated */}
                    <HorizontalFeed
                        title='Top Rated' movies={topRated}
                        onMovieClicked={(movie) => navigation.navigate('DetailScreen', movie)}
                        onSeeAllClicked={() => navigation.navigate(
                            'MovieListingScreen',
                            {
                                category: 'topRated',
                                title: 'Top Rated'
                            }
                        )} />

                </View >
            </ScrollView>

            {
                error && <Snackbar
                    message={error}
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