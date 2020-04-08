import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import * as config from '../../config';
import { Coords } from '../schemas/Coords';

class PersonalizationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${this.context.envVars.google.maps_uri}/`;
  }

  // willSendRequest(request: RequestOptions) {
  //   request.headers.set('Authorization', this.context.token);
  // }

  async getGeocoding({ lat, lng }: Coords) {
    const params = {
      key: config.google.key,
      latlng: `${lat},${lng}`,
    };
    const response = await this.get('geocode/json', params);
    const { formatted_address } = response.results[0];

    const normalisedResult = response.results.reduce((result, item) => {
      if (item.types.includes('administrative_area_level_3'))
        result.borough = item.address_components[0].long_name;
      if (item.types.includes('administrative_area_level_2'))
        result.county = item.address_components[0].long_name;
      if (item.types.includes('postal_code_prefix')) result.postalArea = item.formatted_address;
      if (item.types.includes('neighborhood'))
        result.neighborhood = item.address_components[0].long_name;
      if (item.types.includes('sublocality')) result.area = item.address_components[0].long_name;
      else if (!result.area && item.types.includes('locality'))
        result.area = item.address_components[0].long_name;

      return result;
    }, {});

    const { borough, county, postalArea, area, neighborhood } = normalisedResult;

    return {
      address: formatted_address,
      borough,
      county,
      postalArea,
      area: neighborhood || area,
    };
  }
}
