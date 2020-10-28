import { Coords, OpenTime } from '../../schemas';

export interface PlacesResponse {
  html_attributions: unknown;
  next_page_token?: string;
  results: PlaceResultResponse[];
  status: string;
}

export interface PlaceDetailsResponse extends Omit<PlacesResponse, 'results'> {
  result: PlaceResultResponse;
}

export interface PlaceResultResponse {
  geometry: {
    location: Coords;
    viewport: {
      northeast: Coords;
      southwest: Coords;
    };
  };
  icon?: string;
  id?: string;
  name: string;
  opening_hours: OpeningHoursResponse;
  photos: PhotoResponse[];
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  price_level: number;
  rating: number;
  reference?: string;
  scope?: string;
  types?: string[];
  user_ratings_total?: number;
  vicinity: string;
}

export interface PhotoResponse {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface OpeningHoursResponse {
  open_now: boolean;
  periods?: OpenTime[];
  weekday_text?: string[];
}
