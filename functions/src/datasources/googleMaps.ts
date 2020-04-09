import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import moment from 'moment';
// import * as config from '../config';
import { Coords } from '../schemas/Coords';
import { Location } from '../schemas/Location';
import { Pub } from '../schemas/Pub';
import { PubArgs } from '../resolvers/types/pub-args';
import { distanceBetweenCoords, bearingBetweenCoords } from '../utils';

export class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    // this.baseURL = `${config.env.google.maps_uri}/`;
    this.baseURL = `${'config.env.google.maps_uri'}/`;
  }

  // willSendRequest(request: RequestOptions) {
  //   request.headers.set('Authorization', this.context.token);
  // }

  //  async didReceiveResponse(response) {
  //    let body = await this.parseBody(response);
  //    if (response.url.includes('googleusercontent')) {
  //      body = { url: await response.url };
  //    }

  //    return { ...body };
  //  }

  async getGeocoding({ lat, lng }: Coords) {
    const params = {
      // key: config.google.key,
      latlng: `${lat},${lng}`,
    };
    const response = await this.get('geocode/json', params);

    const { formatted_address } = response.results[0];
    const { borough, county, postalArea, area, neighborhood } = response.results.reduce(
      (result, item) => {
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
      },
      {}
    );

    return {
      address: formatted_address,
      borough,
      county,
      postalArea,
      area: neighborhood || area,
    };
  }

  async getPubsNear({ lat, lng }: Coords) {
    const params = {
      // key: config.google.key,
      location: `${lat},${lng}`,
      radius: '1500',
      keyword: 'pub,bar',
      opennow: true,
    };
    const response = await this.get('place/nearbysearch/json', params);

    return response.results
      .map(item => ({
        id: item.place_id,
        name: item.name,
        coords: item.geometry.location,
        address: item.vicinity,
        rating: item.rating,
        priceLevel: item.price_level,
        photos: item.photos,
      }))
      .sort((a: Pub, b: Pub) =>
        distanceBetweenCoords({ lat, lng }, a.coords) >
        distanceBetweenCoords({ lat, lng }, b.coords)
          ? 1
          : -1
      );
    // .slice(0, first || response.results.length);
  }

  async getPubDetails(id: String, options?) {
    const params = {
      // key: config.google.key,
      place_id: id,
      fields: 'place_id,name,geometry,vicinity,rating,price_level,opening_hours,photos',
    };
    const response = await this.get('place/details/json', params);
    const {
      place_id,
      name,
      geometry,
      vicinity,
      rating,
      price_level,
      opening_hours,
      photos,
    } = response.result;

    const openTimes = options.today
      ? opening_hours.periods.filter(item => {
          const { open, close } = item;
          const today = moment(options.today);
          const openMoment = moment(`${open.day} ${open.time}`, 'e HHmm');
          const closeMoment = moment(`${close.day} ${close.time}`, 'e HHmm');
          // If opens on Sat and closes on Sun
          if (close.day < open.day) {
            if (today.day() === 6) closeMoment.add(1, 'w'); // closes 'next week'
            if (today.day() === 0) openMoment.subtract(1, 'w'); // opened 'last week'
          }

          return openMoment.isBefore(options.today) && closeMoment.isAfter(options.today);
        })
      : opening_hours.periods;

    return {
      id: place_id,
      name,
      coords: geometry.location,
      address: vicinity,
      rating,
      priceLevel: price_level,
      openTimes,
      photos,
    };
  }

  async getDirections(from: Coords, to: Coords) {
    return {};
  }
}
