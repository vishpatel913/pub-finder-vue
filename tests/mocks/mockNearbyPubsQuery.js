module.exports = {
  data: {
    location: {
      coords: {
        lat: 51.50,
        lng: -0.15,
      },
      address: '30C Eckstein Rd, London SW11 1QF, UK',
      district: 'Battersea',
      city: 'London',
      county: 'Greater London',
      postalCode: 'London SW11, UK',
    },
    pubs: [
      {
        id: 'TEST_ID',
        name: 'The Magic Garden',
        address: '231 Battersea Park Rd, London',
        coords: {
          lat: 51.4753333,
          lng: -0.1508611,
        },
        rating: 4.2,
        priceLevel: 2,
        link: 'http://google.com/maps/place/magic-garden',
        directions: {
          distance: 123,
          bearing: 149.28,
          link: 'http://google.com/maps/directions/magic-garden',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'Fernando De Franceschi',
          },
        ],
        openTimes: [
          {
            open: {
              day: 5,
              time: '1030',
            },
            close: {
              day: 6,
              time: '0100',
            },
          },
        ],
      },
      {
        name: 'The Plough Bar & Kitchen',
        address: "89 St John's Hill, London",
        coords: {
          lat: 51.461551,
          lng: -0.1731125,
        },
        rating: 4,
        priceLevel: 2,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 190,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'Alex Rutherford',
          },
        ],
        openTimes: [
          {
            open: {
              day: 5,
              time: '1000',
            },
            close: {
              day: 6,
              time: '0000',
            },
          },
        ],
      },
      {
        name: 'The Northcote',
        address: '2 Northcote Rd, London',
        coords: {
          lat: 51.460745,
          lng: -0.167186,
        },
        rating: 4,
        priceLevel: 2,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 190,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'Youngs Driver2',
          },
        ],
        openTimes: [
          {
            open: {
              day: 5,
              time: '1000',
            },
            close: {
              day: 6,
              time: '0000',
            },
          },
        ],
      },
      {
        name: 'Scratch Bar',
        address: 'Battersea Arts Centre, Lavender Hill, London',
        coords: {
          lat: 51.46485699999999,
          lng: -0.16051,
        },
        rating: 4.1,
        priceLevel: null,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 132,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'Scratch Bar',
          },
        ],
        openTimes: [
          {
            open: {
              day: 5,
              time: '1000',
            },
            close: {
              day: 5,
              time: '2200',
            },
          },
        ],
      },
      {
        name: 'Wetherspoon Free House',
        address: 'London',
        coords: {
          lat: 51.4699019,
          lng: -0.1714306,
        },
        rating: 4.2,
        priceLevel: 1,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 152,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'A Google User',
          },
        ],
        openTimes: [
          {
            open: {
              day: '5',
              time: '0800',
            },
            close: {
              day: '6',
              time: '0000',
            },
          },
        ],
      },
      {
        name: 'The Asparagus',
        address: '1-13 Falcon Rd, London',
        coords: {
          lat: 51.46987799999999,
          lng: -0.171417,
        },
        rating: 4,
        priceLevel: 1,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 136,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'Mick Hicks',
          },
        ],
        openTimes: [
          {
            open: {
              day: '5',
              time: '0800',
            },
            close: {
              day: '6',
              time: '0000',
            },
          },
        ],
      },
      {
        name: 'PubLove @ The Crown',
        address: '102 Lavender Hill, London',
        coords: {
          lat: 51.4656759,
          lng: -0.1559874,
        },
        rating: 4.1,
        priceLevel: null,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 910,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'Giulio Bontadini',
          },
        ],
        openTimes: [
          {
            open: {
              day: '5',
              time: '1000',
            },
            close: {
              day: '5',
              time: '2300',
            },
          },
        ],
      },
      {
        name: 'The Alma Pub',
        address: '499 Old York Rd, London',
        coords: {
          lat: 51.4607246,
          lng: -0.187672,
        },
        rating: 4.4,
        priceLevel: null,
        link: 'http://lorempixel.com/640/480/nightlife',
        directions: {
          distance: 90,
          bearing: 149.28,
          link: 'http://lorempixel.com/640/480/nightlife',
        },
        photos: [
          {
            url: 'http://lorempixel.com/640/480/nightlife',
            attribution: 'A Google User',
          },
        ],
        openTimes: [
          {
            open: {
              day: '5',
              time: '0700',
            },
            close: {
              day: '6',
              time: '0000',
            },
          },
        ],
      },
    ],
  },
};
