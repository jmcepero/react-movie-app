export interface PeoplesResponse {
  page: number;
  results: PeopleResponse[];
  total_pages: number;
  total_results: number;
}

export interface PeopleResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: KnownForDepartment;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface KnownFor {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: OriginalLanguage;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}

export enum OriginalLanguage {
  Da = 'da',
  En = 'en',
  It = 'it',
  Ko = 'ko',
  Tl = 'tl',
  Tr = 'tr',
}

export enum KnownForDepartment {
  Acting = 'Acting',
  Directing = 'Directing',
}
