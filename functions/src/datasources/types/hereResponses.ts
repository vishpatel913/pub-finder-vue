export interface GeocodeResponse {
  items: GeocodeResult[];
}

export interface GeocodeResult {
  title: string;
  id: string;
  resultType: string;
  houseNumberType: string;
  addressBlockType: string;
  localityType: string;
  administrativeAreaType: string;
  address: Address;
  position: Position;
  access: Position[];
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

interface Address {
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

interface Position {
  lat: number;
  lng: number;
}
