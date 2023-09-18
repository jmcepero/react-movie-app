import {Item} from '../../base/Item';
import {Credits, Reviews} from '../../movie/entities/Movies';

export interface TVShows {
  page: number;
  results: TVShow[];
  totalPages: number;
  totalResults: number;
}

export interface BaseGenres {
  id: number;
  name: string;
}

export interface TVShow extends Item {
  backdropPath: string;
  firstAirDate: string;
  genreIds: BaseGenres[];
  id: number;
  name: string;
  originCountry: string[];
  originalLanguage: string;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
  credits?: Credits;
  director?: string;
  trailer?: string;
  reviews?: Reviews;
  seasons?: Season[];
}

export interface Season {
  airDate: string;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
}
