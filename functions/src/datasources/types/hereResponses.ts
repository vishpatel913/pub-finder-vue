import { Coords } from '../../schemas';

export interface GeocodeResponse {
  items: GeocodeResultResponse[];
}

export interface GeocodeResultResponse {
  title: string;
  id: string;
  resultType: string;
  houseNumberType: string;
  addressBlockType: string;
  localityType: string;
  administrativeAreaType: string;
  address: AddressResponse;
  position: Coords;
  access: Coords[];
  distance: number;
  mapView: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
  categories: unknown;
  foodTypes: unknown;
  houseNumberFallback: boolean;
  scoring: unknown;
}

interface AddressResponse {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  countyCode: string;
  county: string;
  city: string;
  district: string;
  subdistrict: string;
  street: string;
  block: string;
  subblock: string;
  postalCode: string;
  houseNumber: string;
}
