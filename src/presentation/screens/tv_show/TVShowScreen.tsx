import React, { useEffect } from 'react';
import { RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoadingView } from '../../components/base/LoadingView';
import { CustomToolbar } from '../../components/home/CustomToolbar';
import { GenresFeed } from '../../components/home/GenresFeed';
import { MainCarousel } from '../../components/home/MainCarousel';
import { HorizontalFeed } from '../../components/HorizontalFeed';
import { SearchBar } from '../../components/home/SearchBar';
import { Snackbar } from '@react-native-material/core';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { loadHomeMoviesAsync } from '../../../store/slices/home/HomeSlice';
import { loadTVShowsAsync } from '../../../store/slices/tv_shows/TVShowSlice';
import { TVShowCarousel } from './components/TVShowCarousel';
import { TVShowHorizontalFeed } from './components/TVShowHorizontalFeed';

export const TVShowScreen = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const dispatch = useAppDispatch();
    const { isLoading, onTheAir, popular, topRated, error } = useAppSelector(state => state.tvShow);

    const refreshData = () => {
        dispatch(loadTVShowsAsync());
    };

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
                    <CustomToolbar title='TV Shows' />

                    {/* Search Section */}
                    <SearchBar onClick={
                        () => navigation.navigate('SearchScreen', { type: 'tvShow' })
                    } />

                    {/* Main Corousel */}
                    <TVShowCarousel
                        title='Top Rated'
                        tvShows={topRated}
                        onTVShowClicked={(tvShow) => {
                            navigation.navigate('TVShowDetailScreen', { tvShowId: tvShow.id });
                        }}
                    />

                    {/* Popular */}
                    <TVShowHorizontalFeed
                        title='Popular' tvShows={popular}
                        onTVShowClicked={(tvShow) => {
                            navigation.navigate('TVShowDetailScreen', { tvShowId: tvShow.id });
                        }}
                        onSeeAllClicked={() => { }} />

                    {/* Top Rated */}
                    <TVShowHorizontalFeed
                        title='On The Air' tvShows={onTheAir}
                        onTVShowClicked={(tvShow) => {
                            navigation.navigate('TVShowDetailScreen', { tvShowId: tvShow.id });
                        }}
                        onSeeAllClicked={() => { }} />

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