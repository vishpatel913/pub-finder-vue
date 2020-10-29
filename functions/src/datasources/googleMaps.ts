import {
  RESTDataSource,
  Response,
  // RequestOptions,
} from 'apollo-datasource-rest';
import { DateTime } from 'luxon';
import { Coords, Pub, Photo, Direction, OpenTime } from '../schemas';
import {
  PlacesResponse,
  PlaceDetailsResponse,
  PlaceResultResponse,
} from './types';
import { distanceBetweenCoords, bearingBetweenCoords } from '../utils';
import { config } from '../config';

class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.env.google.maps_uri}/`;
  }

  // async willSendRequest(request: RequestOptions): Promise<void> {
  //   console.log('HIT willSendRequest');
  //   request.headers.set('Authorization', this.context.token);
  // }

  protected async didReceiveResponse<TResult = unknown>(
    response: Response
  ): Promise<TResult> {
    if (response.ok) {
      if (response.url.includes('googleusercontent')) {
        return (response.url as unknown) as Promise<TResult>;
      }
      return (this.parseBody(response) as unknown) as Promise<TResult>;
    } else {
      throw await this.errorFromResponse(response);
    }
  }

  async getPubsNear({ lat, lng }: Coords): Promise<Pub[]> {
    const params = {
      key: config.env.google.key,
      location: `${lat},${lng}`,
      radius: '1500',
      keyword: 'pub,bar',
      opennow: true,
    };
    const response: PlacesResponse = await this.get(
      'place/nearbysearch/json',
      params
    );

    return response.results
      .map(result =>
        GoogleMaps.normalisePlaceResponse(result, { origin: { lat, lng } })
      )
      .sort((a: Pub, b: Pub) =>
        distanceBetweenCoords({ lat, lng }, a.coords) >
        distanceBetweenCoords({ lat, lng }, b.coords)
          ? 1
          : -1
      );
  }

  async getPubDetails(id: string, args?: { date?: string }): Promise<Pub> {
    const params = {
      key: config.env.google.key,
      place_id: id,
      fields:
        'place_id,name,geometry,vicinity,rating,price_level,opening_hours,photos',
    };
    const { result }: PlaceDetailsResponse = await this.get(
      'place/details/json',
      params,
      {
        cacheOptions: { ttl: 360 },
      }
    );

    return GoogleMaps.normalisePlaceResponse(result, { time: args?.date });
  }

  async getDirections(origin: Coords, dest: Coords): Promise<Direction> {
    const params = {
      key: config.env.google.key,
      mode: 'walking',
      origin: Object.values(origin).join(','),
      destination: Object.values(dest).join(','),
    };

    const response = await this.get('directions/json', params, {
      cacheOptions: { ttl: 360 },
    });
    const { legs } = response.routes[0];

    return {
      distance: legs[0].distance.value,
      duration: legs[0].duration.value,
      bearing: bearingBetweenCoords(origin, dest),
    };
  }

  async getPhotoData(
    photoRef: string,
    htmlAttribution?: string[],
    size = 500
  ): Promise<Photo> {
    const params = {
      key: config.env.google.key,
      photoreference: photoRef,
      maxwidth: size,
      maxheight: size,
    };

    const response = await this.get('place/photo', params, {
      cacheOptions: { ttl: 360 },
    });

    return {
      url: response,
      attribution: htmlAttribution?.[0].replace(/<\s*a[^>]*>|<\s*\/\s*a>/g, ''),
    };
  }

  private static normalisePlaceResponse(
    result: PlaceResultResponse,
    params?: { origin?: Coords; time?: string }
  ): Pub {
    const {
      place_id,
      name,
      geometry: { location },
      vicinity,
      rating,
      price_level,
      photos,
      opening_hours,
    } = result;

    const openTimes =
      opening_hours.periods?.reduce((acc: OpenTime[], c) => {
        const item = c;
        if (item.open.day === 0) item.open.day = 7;
        if (item.close.day === 0) item.close.day = 7;
        if (params?.time) {
          const { open, close } = item;
          if (!open || !close) {
            return acc;
          }
          const todayDt = params?.time
            ? DateTime.fromISO(params.time)
            : DateTime.local();
          const openDt = DateTime.fromISO(todayDt.toString()).set({
            weekday: open.day,
            hour: parseInt(open.time.slice(0, 2)),
            minute: parseInt(open.time.slice(2, 4)),
          });
          const closeDt = DateTime.fromISO(todayDt.toString()).set({
            weekday: close.day,
            hour: parseInt(close.time.slice(0, 2)),
            minute: parseInt(close.time.slice(2, 4)),
          });
          // If opens on Sat and closes on Sun
          // if (close.day < open.day) {
          //   if (todayDt.day === 6) closeDt.plus({ days: 7 }); // closes 'next week'
          //   if (todayDt.day === 7) openDt.minus({ days: 7 }); // opened 'last week'
          // }

          return openDt < todayDt && closeDt > todayDt ? [item] : acc;
        } else {
          return [...acc, item];
        }
      }, []) || [];

    const encodedName = encodeURIComponent(name);

    return {
      id: place_id,
      name,
      coords: location,
      address: vicinity,
      rating,
      priceLevel: price_level,
      openTimes,
      photos,
      links: params?.origin
        ? {
            place: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${place_id}`,
            directions: `https://www.google.com/maps/dir/?api=1&origin=${params.origin.lat},${params.origin.lng}&destination=${encodedName}&destination_place_id=${place_id}&travelmode=walking`,
          }
        : undefined,
    };
  }
}

export default GoogleMaps;
