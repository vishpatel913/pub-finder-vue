import { RESTDataSource } from 'apollo-datasource-rest';
import { Coords, Location } from '../schemas';
import { config } from '../config';
import { GeocodeResponse, GeocodeResult } from './types';

class Here extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.env.here.geocode_uri}/`;
  }

  async getGeocoding({ lat, lng }: Coords): Promise<Location> {
    const params = {
      apikey: config.env.here.key,
      at: `${lat},${lng}`,
    };
    const { items }: GeocodeResponse = await this.get('revgeocode', params);

    return Here.normaliseResponse(items[0]);
  }

  async getSearchResults(
    query: string,
    countryCode = 'GBR'
  ): Promise<Location[]> {
    const params = {
      apikey: config.env.here.key,
      q: query,
      in: `countryCode:${countryCode}`,
    };
    const { items }: GeocodeResponse = await this.get('geocode', params);

    return items.map(Here.normaliseResponse);
  }

  private static normaliseResponse(result: GeocodeResult): Location {
    const { address, position } = result;
    const { label, county, city, district, postalCode } = address;

    return {
      coords: position,
      address: label,
      district,
      city,
      county,
      postalCode: postalCode.split(' ')[0],
    };
  }
}

export default Here;
