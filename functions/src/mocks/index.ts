import faker from 'faker';
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
      lat: args?.coords?.lat || parseFloat(faker.address.latitude()),
      lng: args?.coords?.lng || parseFloat(faker.address.latitude()),
    },
    address: faker.address.streetAddress(),
    district: faker.address.city(),
    city: faker.fake('{{address.cityPrefix}}{{address.citySuffix}}'),
    county: faker.address.county(),
    postalCode: faker.fake(
      '{{address.stateAbbr}}{{random.number({"min":1,"max":29})}}'
    ),
  }),
  Pub: (): unknown => ({
    id: faker.random.uuid(),
    name: faker
      .fake('The {{commerce.productAdjective}} {{commerce.product}}')
      .replace(/s$/g, ''),
    address: faker.address.streetAddress(),
    coords: {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    },
    rating: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    priceLevel: faker.random.number({ min: 1, max: 5 }),
    directions: (_: unknown, args: { from: CoordsInput }) => ({
      distance: faker.random.number({ min: 1, max: 1000 }),
      duration: faker.random.number({ min: 1, max: 1200 }),
      bearing: faker.random.number({ min: 1, max: 360, precision: 0.01 }),
      link: `https://www.google.com/maps/dir/?api=1&origin=${args.from.lat},${args.from.lng}&destination=encodedname&destination_place_id=ChIJvZviab0FdkgR8w4do7vbgy4&travelmode=walking`,
    }),
    openTimes: [
      {
        open: {
          day: parseInt(DateTime.local().toFormat('c')) - 1,
          time: `0${faker.random.number({ min: 1, max: 9 })}00`,
        },
        close: {
          day: parseInt(DateTime.local().toFormat('c')) - 1,
          time: `2300`,
        },
      },
    ],
    photos: [
      {
        attribution: faker.fake('{{name.firstName}} {{name.lastName}}'),
        url: faker.image.nightlife(),
      },
    ],
    link:
      'https://www.google.com/maps/search/?api=1&query=51.4608424,-0.1635043&query_place_id=ChIJn6EbZr0FdkgRHniNnrBipTo',
  }),
};
