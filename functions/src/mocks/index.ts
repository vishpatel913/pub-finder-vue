import faker from 'faker';
import moment from 'moment';
import { MockList } from 'apollo-server-cloud-functions';

export const mocks = {
  Int: () => 7,
  String: () => 'Something about mocks',
  Query: () => ({
    pubs: (parent: any, args: { first: number }) =>
      new MockList(args.first < 20 ? args.first : 20),
  }),
  Location: () => ({
    address: () => faker.address.streetAddress(),
    area: () => faker.fake('{{address.cityPrefix}}{{address.citySuffix}}'),
    borough: () => faker.address.county(),
    county: () => faker.address.state(),
    postalArea: () =>
      faker.fake(
        '{{address.city}} {{address.zipCode}}, {{address.countryCode}}'
      ),
  }),
  Pub: () => ({
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
        url:
          'https://media-cdn.tripadvisor.com/media/photo-s/11/d7/76/bf/the-pagoda.jpg',
      },
    ],
  }),
};
