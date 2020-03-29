const faker = require("faker");
const moment = require("moment");

const mocks = {
  Int: () => 7,
  String: () => "Something about mocks",
  Location: () => ({
    address: () => faker.address.streetAddress(),
    area: () => faker.fake("{{address.cityPrefix}}{{address.citySuffix}}"),
    borough: () => faker.address.county(),
    county: () => faker.address.state(),
    postalArea: () =>
      faker.fake(
        "{{address.city}} {{address.zipCode}}, {{address.countryCode}}"
      )
  }),
  Pub: () => ({
    id: () => faker.random.uuid(),
    name: () =>
      faker
        .fake("The {{commerce.productName}}")
        .split("s")
        .reduce((p, c) => {
          c.length !== 0 && p.push(c);
          return p;
        }, [])
        .join("s"),
    address: () => faker.address.streetAddress(),
    coords: () => ({
      lat: () => faker.address.latitude(),
      lng: () => faker.address.longitude()
    }),
    rating: () => faker.random.number({ min: 0, max: 5 }),
    priceLevel: () => faker.random.number({ min: 0, max: 5 }),
    directions: () => ({
      distance: () => faker.random.number({ min: 1, max: 1000 }),
      duration: () => faker.random.number({ min: 1, max: 1200 }),
      bearing: () => faker.random.number({ min: 1, max: 360 })
    }),
    openTimes: [
      {
        open: {
          day: moment().format("e"),
          time: `0400`
        },
        close: {
          day: moment().format("e"),
          time: `2355`
        }
      }
    ],
    photos: () => [
      {
        attribution: faker.fake("{{name.firstName}} {{name.lastName}}"),
        url:
          "https://media-cdn.tripadvisor.com/media/photo-s/11/d7/76/bf/the-pagoda.jpg"
      }
    ]
  })
};

module.exports = { mocks };
