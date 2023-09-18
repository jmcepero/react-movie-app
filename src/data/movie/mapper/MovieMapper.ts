import {MoviesResponse, MovieDetailResponse} from '../entities/MovieInterface';
import {Movies, Movie} from '../../../domain/movie/entities/Movies';

export const moviesResponseToDomain = (
  moviesResponse: MoviesResponse,
): Movies => ({
  dates: {
    maximum: moviesResponse.dates?.maximum || '',
    minimum: moviesResponse.dates?.minimum || '',
  },
  page: moviesResponse.page,
  results: moviesResponse.results.map(movie => {
    return {
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      genreIds: [],
      id: movie.id,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      video: movie.video,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    };
  }),
  totalPages: moviesResponse.total_pages,
  totalResults: moviesResponse.total_results,
});

export const movieDetailResponseToDetail = (
  movieDetailResponse: MovieDetailResponse,
): Movie => {
  return {
    adult: movieDetailResponse.adult,
    backdropPath: movieDetailResponse.backdrop_path,
    genreIds: movieDetailResponse.genres.map(item => ({
      id: item.id,
      name: item.name,
    })),
    originalTitle: movieDetailResponse.original_title,
    id: movieDetailResponse.id,
    releaseDate: movieDetailResponse.release_date,
    title: movieDetailResponse.title,
    overview: movieDetailResponse.overview,
    popularity: movieDetailResponse.popularity,
    posterPath: movieDetailResponse.poster_path,
    video: movieDetailResponse.video,
    voteAverage: movieDetailResponse.vote_average,
    voteCount: movieDetailResponse.vote_count,
    credits: movieDetailResponse.credits
      ? {
          cast: movieDetailResponse.credits.cast.map(item => ({
            id: item.id,
            knownForDepartment: item.known_for_department,
            name: item.name,
            originalName: item.original_name,
            profilePath: item.profile_path,
          })),
          crew: movieDetailResponse.credits.crew.map(item => ({
            id: item.id,
            knownForDepartment: item.known_for_department,
            name: item.name,
            originalName: item.original_name,
            profilePath: item.profile_path,
          })),
        }
      : undefined,
    director: movieDetailResponse.credits
      ? movieDetailResponse.credits.crew.find(cast => {
          return cast.known_for_department === 'Directing';
        })?.name
      : undefined,
    trailer: movieDetailResponse.videos
      ? movieDetailResponse.videos.results.find(video => {
          return video.type === 'Trailer';
        })?.key
      : undefined,
    reviews: movieDetailResponse.reviews
      ? {
          results: movieDetailResponse.reviews.results.map(item => ({
            author: item.author,
            authorDetails: {
              name: item.author_details.name,
              username: item.author_details.username,
              avatarPath: item.author_details.avatar_path,
              rating: item.author_details.rating,
            },
            content: item.content,
            createdAt: item.created_at,
            id: item.id,
            updatedAt: item.updated_at,
            url: item.url,
          })),
        }
      : undefined,
  };
};
