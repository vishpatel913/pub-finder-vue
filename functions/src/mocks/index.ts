import faker from 'faker';
import moment from 'moment';
import { MockList } from 'apollo-server-cloud-functions';
import { Pub } from '../schemas';

export const mocks = {
  Int: (): number => 7,
  String: (): string => 'Something about mocks',
  Query: (): any => {
    return {
      pubs: (
        parent: Pub,
        args: {
          first: number;
        }
      ) => new MockList(args.first),
    };
  },
  Location: (): any => ({
    address: () => faker.address.streetAddress(),
    district: () => faker.address.city(),
    city: () => faker.fake('{{address.cityPrefix}}{{address.citySuffix}}'),
    county: () => faker.address.county(),
    postalCode: () =>
      faker.fake('{{address.stateAbbr}}{{random.number({"min":1,"max":20})}}'),
  }),
  Pub: (): any => ({
    id: () => faker.random.uuid(),
    name: () =>
      faker
        .fake('The {{commerce.productAdjective}} {{commerce.product}}')
        .replace(/s$/g, ''),
    address: () => faker.address.streetAddress(),
    coords: () => ({
      lat: () => faker.address.latitude(),
      lng: () => faker.address.longitude(),
    }),
    rating: () => faker.random.number({ min: 0, max: 5, precision: 0.1 }),
    priceLevel: () => faker.random.number({ min: 1, max: 5 }),
    directions: () => ({
      distance: () => faker.random.number({ min: 1, max: 1000 }),
      duration: () => faker.random.number({ min: 1, max: 1200 }),
      bearing: () => faker.random.number({ min: 1, max: 360, precision: 0.01 }),
    }),
    openTimes: [
      {
        open: {
          day: moment().format('e'),
          time: `0400`,
        },
        close: {
          day: moment().format('e'),
          time: `2355`,
        },
      },
    ],
    photos: () => [
      {
        attribution: faker.fake('{{name.firstName}} {{name.lastName}}'),
        url: faker.image.nightlife(),
      },
    ],
  }),
};
