import {
  Cast as CastDomain,
  KnownForDepartment,
  People,
  PeopleDetail,
  Peoples,
} from '../../../domain/people/entities/People';
import {
  PeoplesResponse,
  PeopleResponse,
  Cast,
  KnownForDepartmentResponse,
  PeopleDetailResponse,
} from '../entities/PeopleInterfaces';

export const peopleResponseToDomain = (
  peoplesResponse: PeoplesResponse,
): Peoples => ({
  page: peoplesResponse.page,
  results: peoplesResponse.results
    .filter(people => people.profile_path)
    .map(peopleToDomain),
  totalPages: peoplesResponse.total_pages,
  totalResults: peoplesResponse.total_results,
});

const peopleToDomain = (people: PeopleResponse): People => ({
  adult: people.adult,
  gender: people.gender,
  id: people.id,
  known_for: people.known_for.map(knownForToDomain),
  known_for_department: knownForDepartmentToDomain(people.known_for_department),
  name: people.name,
  popularity: people.popularity,
  profile_path: people.profile_path,
});

const knownForToDomain = (knownFor: Cast): CastDomain => ({
  adult: knownFor.adult,
  backdrop_path: knownFor.backdrop_path,
  genre_ids: knownFor.genre_ids,
  id: knownFor.id,
  media_type: knownFor.media_type,
  original_language: knownFor.original_language,
  original_title: knownFor.original_title,
  overview: knownFor.overview,
  poster_path: knownFor.poster_path,
  release_date: knownFor.release_date,
  title: knownFor.title,
  video: knownFor.video,
  vote_average: knownFor.vote_average,
  vote_count: knownFor.vote_count,
  first_air_date: knownFor.first_air_date,
  name: knownFor.name,
  origin_country: knownFor.origin_country,
  original_name: knownFor.original_name,
});

const knownForDepartmentToDomain = (
  knowForDepartment: KnownForDepartmentResponse,
): KnownForDepartment => {
  switch (knowForDepartment) {
    case 'Acting':
      return KnownForDepartment.Acting;
    default:
      return KnownForDepartment.Directing;
  }
};

const removeDuplicates = <T extends {id: number}>(array: T[]): T[] => {
  return Array.from(new Set(array.map(item => item.id))).map(
    id => array.find(item => item.id === id) as T,
  );
};

export const peopleDetailToDomain = (
  people: PeopleDetailResponse,
): PeopleDetail => ({
  adult: people.adult,
  also_known_as: people.also_known_as,
  biography: people.biography,
  birthday: people.birthday,
  deathday: people.deathday,
  gender: people.gender,
  id: people.id,
  imdb_id: people.imdb_id,
  known_for_department: people.known_for_department,
  name: people.name,
  place_of_birth: people.place_of_birth,
  popularity: people.popularity,
  profile_path: people.profile_path,
  movie_credits: {
    cast: removeDuplicates(
      people.movie_credits.cast
        .sort((a, b) => {
          if (a.release_date === undefined) return 1;
          if (b.release_date === undefined) return -1;
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        })
        .map(knownForToDomain)
        .filter(cast => cast.poster_path)
        .slice(0, 10),
    ),
    crew: removeDuplicates(
      people.movie_credits.crew
        .sort((a, b) => {
          if (a.release_date === undefined) return 1;
          if (b.release_date === undefined) return -1;
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        })
        .map(knownForToDomain)
        .filter(cast => cast.poster_path)
        .slice(0, 10),
    ),
    id: people.movie_credits.id,
  },
  tv_credits: {
    cast: removeDuplicates(
      people.tv_credits.cast
        .sort((a, b) => {
          if (a.first_air_date === undefined) return 1;
          if (b.first_air_date === undefined) return -1;
          return (
            new Date(b.first_air_date).getTime() -
            new Date(a.first_air_date).getTime()
          );
        })
        .map(knownForToDomain)
        .filter(cast => cast.poster_path)
        .slice(0, 10),
    ),
    crew: removeDuplicates(
      people.tv_credits.crew
        .sort((a, b) => {
          if (a.first_air_date === undefined) return 1;
          if (b.first_air_date === undefined) return -1;
          return (
            new Date(b.first_air_date).getTime() -
            new Date(a.first_air_date).getTime()
          );
        })
        .map(knownForToDomain)
        .filter(cast => cast.poster_path)
        .slice(0, 10),
    ),
    id: people.tv_credits.id,
  },
});
