import { RESTDataSource } from 'apollo-datasource-rest';
import { Coords, Location } from '../schemas';
import { config } from '../config';

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
    const { items } = await this.get('revgeocode', params);
    const { address } = items[0];
    const { label, county, city, district, postalCode } = address;

    return {
      address: label,
      district,
      city,
      county,
      postalCode: postalCode.split(' ')[0],
    };
  }
}

export default Here;
