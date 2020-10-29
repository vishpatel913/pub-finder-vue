import faker from 'faker';
import { DateTime } from 'luxon';
import { MockList } from 'apollo-server-cloud-functions';
import { Pub, Location } from '../schemas';

export const mocks = {
  Int: (): number => 7,
  String: (): string => 'Something about mocks',
  Query: (): unknown => ({
    pubs: (parent: Pub, args: { first: number }) => new MockList(args.first),
  }),
  Location: (): Location => ({
    coords: {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    },
    address: faker.address.streetAddress(),
    district: faker.address.city(),
    city: faker.fake('{{address.cityPrefix}}{{address.citySuffix}}'),
    county: faker.address.county(),
    postalCode: faker.fake(
      '{{address.stateAbbr}}{{random.number({"min":1,"max":20})}}'
    ),
  }),
  Pub: (): Pub => ({
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
    directions: {
      distance: faker.random.number({ min: 1, max: 1000 }),
      duration: faker.random.number({ min: 1, max: 1200 }),
      bearing: faker.random.number({ min: 1, max: 360, precision: 0.01 }),
    },
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
