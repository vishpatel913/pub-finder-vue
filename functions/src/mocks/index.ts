import { fake, address, random, image } from 'faker';
import { DateTime } from 'luxon';
import { MockList } from 'apollo-server-cloud-functions';
import { Location } from '../schemas';
import { CoordsInput } from '../resolvers/types';

export const mocks = {
  Int: (): number => 7,
  String: (): string => 'Something about mocks',
  Query: (): unknown => ({
    pubs: (_: unknown, args: { first: number }) => new MockList(args.first),
    searchLocation: () => new MockList(5),
  }),
  Location: (_: unknown, args: { [key: string]: CoordsInput }): Location => ({
    coords: {
      lat: args?.coords?.lat || parseFloat(address.latitude()),
      lng: args?.coords?.lng || parseFloat(address.latitude()),
    },
    address: address.streetAddress(),
    district: address.city(),
    city: fake('{{address.cityPrefix}}{{address.citySuffix}}'),
    county: address.county(),
    postalCode: fake(
      '{{address.stateAbbr}}{{random.number({"min":1,"max":29})}}'
    ),
  }),
  Pub: (): unknown => ({
    id: random.uuid(),
    name: fake(
      'The {{commerce.productAdjective}} {{commerce.product}}'
    ).replace(/s$/g, ''),
    address: address.streetAddress(),
    coords: {
      lat: parseFloat(address.latitude()),
      lng: parseFloat(address.longitude()),
    },
    rating: random.number({ min: 0, max: 5, precision: 0.1 }),
    priceLevel: random.number({ min: 1, max: 5 }),
    directions: (_: unknown, args: { from: CoordsInput }) => ({
      distance: random.number({ min: 1, max: 1000 }),
      duration: random.number({ min: 1, max: 1200 }),
      bearing: random.number({ min: 1, max: 360, precision: 0.01 }),
      link: `https://www.google.com/maps/dir/?api=1&origin=${args.from.lat},${args.from.lng}&destination=encodedname&destination_place_id=ChIJvZviab0FdkgR8w4do7vbgy4&travelmode=walking`,
    }),
    openTimes: [
      {
        open: {
          day: parseInt(DateTime.local().toFormat('c')),
          time: fake('0{{random.number({"min":0,"max":9})}}00'),
        },
        close: () => {
          const time = random.arrayElement([
            fake(
              '2{{random.number({"min":1,"max":3})}}{{random.number({"min":0,"max":5})}}0'
            ),
            fake(
              '0{{random.number({"min":0,"max":1})}}{{random.number({"min":0,"max":5})}}0'
            ),
          ]);
          const dt = DateTime.local().plus({
            days: time.charAt(0) == '0' ? 1 : 0,
          });
          return {
            day: parseInt(dt.toFormat('c')),
            time,
          };
        },
      },
    ],
    photos: [
      {
        attribution: fake('{{name.firstName}} {{name.lastName}}'),
        url: image.nightlife(),
      },
    ],
    link:
      'https://www.google.com/maps/search/?api=1&query=51.4608424,-0.1635043&query_place_id=ChIJn6EbZr0FdkgRHniNnrBipTo',
  }),
};
