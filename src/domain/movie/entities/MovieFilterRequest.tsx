export interface MovieFilterRequest {
  withGenres?: string;
  watchRegion?: string;
  watchProviders?: string;
  year?: string;
  voteAverageGte?: string;
  sortBy?: string;
}
