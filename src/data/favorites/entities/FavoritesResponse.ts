export interface MarkFavoritePayload {
  media_type: 'movie' | 'tv';
  media_id: number;
  favorite: boolean;
}

export interface MarkFavoriteResponse {
  status_code: number;
  status_message: string;
  success?: boolean;
}
