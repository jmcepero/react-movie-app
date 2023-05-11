import React from 'react'
import { Text, View } from 'react-native'
import { FadeInImage } from '../../../components/base/FadeImage'
import { Season } from '../../../../domain/tv_shows/entities/TVShows'
import { currentSeasonStyle } from './CurrentSeason.style';
import { strDateToYear } from '../../../extensions/StringDate'

interface CurrentSeasonProps {
    tvShowTitle?: string,
    season?: Season
}

export const CurrentSeason = ({ season, tvShowTitle }: CurrentSeasonProps) => {
    const uri = `https://image.tmdb.org/t/p/original${season?.posterPath}`;
    return (
        season !== undefined ? (
            <View>
                <Text style={currentSeasonStyle.headerTitle}>Current Season</Text>
                <View style={currentSeasonStyle.row}>
                    <FadeInImage uri={uri} style={currentSeasonStyle.image} />

                    {/* Container */}
                    <View style={currentSeasonStyle.infoContainer}>
                        <Text style={currentSeasonStyle.title}>{season.name}</Text>
                        <Text style={currentSeasonStyle.subtitle}>{strDateToYear(season.airDate)} | {season.episodeCount} episodes</Text>
                        <Text style={currentSeasonStyle.seasonOverview} numberOfLines={4} ellipsizeMode='tail'>
                            {season.overview || season.name} of {tvShowTitle} premiered on {season.airDate}
                        </Text>
                    </View>
                </View>
            </View>
        ) : <></>
    )
}
