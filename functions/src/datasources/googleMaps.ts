import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import moment from 'moment';
import { Coords, Location, Pub, Photo, Direction, OpenTime } from '../schemas';
import { PubFilterArgs } from '../resolvers/types';
import { distanceBetweenCoords, bearingBetweenCoords } from '../utils';
import { config } from '../config';

export class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.env.google.maps_uri}/`;
  }

  // willSendRequest(request: RequestOptions) {
  //   request.headers.set('Authorization', this.context.token);
  // }

  async didReceiveResponse(response) {
    let res;
    if (response.url.includes('googleusercontent')) {
      res = { url: await response.url };
    } else {
      res = await this.parseBody(response);
    }

    return res;
  }

  async getGeocoding({ lat, lng }: Coords): Promise<Location> {
    const params = {
      key: config.env.google.key,
      latlng: `${lat},${lng}`,
    };
    const response = await this.get('geocode/json', params);

    const { formatted_address } = response.results[0];
    const {
      borough,
      county,
      postalArea,
      area,
      neighborhood,
    } = response.results.reduce((result: any, item: any) => {
      if (item.types.includes('administrative_area_level_3'))
        result.borough = item.address_components[0].long_name;
      if (item.types.includes('administrative_area_level_2'))
        result.county = item.address_components[0].long_name;
      if (item.types.includes('postal_code_prefix'))
        result.postalArea = item.formatted_address;
      if (item.types.includes('neighborhood'))
        result.neighborhood = item.address_components[0].long_name;
      if (item.types.includes('sublocality'))
        result.area = item.address_components[0].long_name;
      else if (!result.area && item.types.includes('locality'))
        result.area = item.address_components[0].long_name;
      return result;
    }, {});

    return {
      address: formatted_address,
      borough,
      county,
      postalArea,
      area: neighborhood || area,
    };
  }

  async getPubsNear(
    { lat, lng }: Coords,
    args?: PubFilterArgs
  ): Promise<Pub[]> {
    const params = {
      key: config.env.google.key,
      location: `${lat},${lng}`,
      radius: '1500',
      keyword: 'pub,bar',
      opennow: true,
    };
    const response = await this.get('place/nearbysearch/json', params);

    return response.results
      .map((item: any) => ({
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
      )
      .slice(0, args?.first || response.results.length);
  }

  async getPubDetails(id: string, args?: { date: string }): Promise<Pub> {
    const params = {
      key: config.env.google.key,
      place_id: id,
      fields:
        'place_id,name,geometry,vicinity,rating,price_level,opening_hours,photos',
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

    const openTimes = args?.date
      ? opening_hours.periods.filter((item: OpenTime) => {
          const { open, close } = item;
          const today = moment(args.date);
          const openMoment = moment(today)
            .day(open.day)
            .hour(+open.time.slice(0, 2))
            .minute(+open.time.slice(2, 4));
          const closeMoment = moment(today)
            .day(close.day)
            .hour(+close.time.slice(0, 2))
            .minute(+close.time.slice(2, 4));
          // If opens on Sat and closes on Sun
          if (close.day < open.day) {
            if (today.day() === 6) closeMoment.add(1, 'w'); // closes 'next week'
            if (today.day() === 0) openMoment.subtract(1, 'w'); // opened 'last week'
          }

          return (
            openMoment.isBefore(args.date) && closeMoment.isAfter(args.date)
          );
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

  async getDirections(origin: Coords, dest: Coords): Promise<Direction> {
    const params = {
      key: config.env.google.key,
      mode: 'walking',
      origin: Object.values(origin).join(','),
      destination: Object.values(dest).join(','),
    };

    const response = await this.get('directions/json', params);
    const { legs } = response.routes[0];

    return {
      distance: legs[0].distance.value,
      duration: legs[0].duration.value,
      bearing: bearingBetweenCoords(origin, dest),
    };
  }

  async getPhotoData(
    { photo_reference, html_attributions },
    size = 500
  ): Promise<Photo> {
    const params = {
      key: config.env.google.key,
      photoreference: photo_reference,
      maxwidth: size,
      maxheight: size,
    };

    const response = await this.get('place/photo', params);

    return {
      url: response.url,
      attribution: html_attributions[0].replace(/<\s*a[^>]*>|<\s*\/\s*a>/g, ''),
    };
  }
}
