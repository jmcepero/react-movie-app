export interface PlacesResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface PlaceDetailsResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  photoUrl: string;
  openingHours: string[];
  rating: number;
}
