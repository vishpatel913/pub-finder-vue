import { GoogleMaps } from '../googleMaps';
import {
  geocodingMockResponse,
  placesMockResponse,
  placeDetailsMockResponse,
  directionsMockResponse,
} from './mocks';

const gm = new GoogleMaps();
const mocks = {
  get: jest.fn(),
};

Object.defineProperty(gm, 'get', { value: mocks.get });

describe('[GoogleMaps]', () => {
  it('constructs with a base url', () => {
    expect(gm.baseURL).not.toHaveLength(0);
  });
});

describe('[GoogleMaps.getGeocoding]', () => {
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(geocodingMockResponse);
    response = await gm.getGeocoding({ lat: 7, lng: 12 });
  });

  it('returns an object with the correct keys', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining(['address', 'area', 'borough', 'county', 'postalArea'])
    );
  });

  it('returns the geocoding data in the correct format', () => {
    expect(response).toEqual(
      expect.objectContaining({
        address: '66 Sisters Ave, London SW11 5SN, UK',
        area: 'London',
        borough: 'London Borough of Wandsworth',
        county: 'Greater London',
        postalArea: 'London SW11, UK',
      })
    );
  });
});

describe('[GoogleMaps.getPubsNear]', () => {
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValue(placesMockResponse);
    response = await gm.getPubsNear({ lat: 7, lng: 12 });
  });

  it('returns all of the pubs', () => {
    expect(response).toHaveLength(3);
  });

  it('returns the pubs in the correct format', () => {
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Osbornes',
          address: '61-73 Osborne Rd, Jesmond, Newcastle upon Tyne',
          rating: 4.1,
          priceLevel: 2,
        }),
      ])
    );
  });

  it('returns the first n amount of pubs', async () => {
    response = await gm.getPubsNear({ lat: 7, lng: 12 }, { first: 2 });
    expect(response).toHaveLength(2);
  });
});

describe('[GoogleMaps.getPubDetails]', () => {
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValue(placeDetailsMockResponse);
    response = await gm.getPubDetails('uuiid');
  });

  it('returns an object with the correct keys', async () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining([
        'id',
        'name',
        'coords',
        'address',
        'rating',
        'priceLevel',
        'openTimes',
        'photos',
      ])
    );
  });

  it('returns the opening hours for every day of the week', () => {
    expect(response.openTimes).toHaveLength(7);
  });

  it('returns a day times in the correct format', () => {
    expect(response.openTimes[0]).toMatchObject({
      open: {
        day: 0,
        time: '1000',
      },
      close: {
        day: 0,
        time: '2230',
      },
    });
    expect(response.openTimes[5]).toMatchObject({
      close: {
        day: 5,
        time: '2300',
      },
      open: {
        day: 5,
        time: '1100',
      },
    });
  });

  it('returns one opentime when given a moment', async () => {
    const newResponse = await gm.getPubDetails('uuid', {
      date: '2020-01-31T20:47:41+01:00',
    });
    expect(newResponse.openTimes).toHaveLength(1);
  });

  it('returns the correct opentime when given a moment', async () => {
    const newResponse = await gm.getPubDetails('uuid', {
      date: '2020-03-31T20:47:41+01:00',
    });
    expect(newResponse.openTimes[0]).toMatchObject({
      open: {
        day: 2,
        time: '1100',
      },
      close: {
        day: 2,
        time: '2300',
      },
    });
  });

  it('returns the correct opentime on a saturday', async () => {
    const newResponse = await gm.getPubDetails('uuid', {
      date: '2020-01-11T20:47:41+01:00',
    });
    expect(newResponse.openTimes[0]).toMatchObject({
      open: {
        day: 6,
        time: '1000',
      },
      close: {
        day: 0,
        time: '0300',
      },
    });
  });

  it('returns the correct opentime on a saturday night/sunday morning', async () => {
    const newResponse = await gm.getPubDetails('uuid', {
      date: '2020-01-12T00:17:41+00:00',
    });
    expect(newResponse.openTimes[0]).toMatchObject({
      open: {
        day: 6,
        time: '1000',
      },
      close: {
        day: 0,
        time: '0300',
      },
    });
  });
});

describe('[GoogleMaps.getDirections]', () => {
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(directionsMockResponse);
    response = await gm.getDirections({ lat: 7, lng: 12 }, { lat: 19, lng: 95 });
  });

  it('returns the direction object in the correct format', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining(['distance', 'duration', 'bearing'])
    );
  });

  it('returns the direction with the correct values', () => {
    expect(response).toEqual(
      expect.objectContaining({
        distance: 398,
        duration: 114,
      })
    );
  });

  it('returns a valid bearing', () => {
    const { bearing } = response;
    expect(bearing >= 0 && bearing <= 360).toBeTruthy();
  });
});

describe('[GoogleMaps.getPhotoData]', () => {
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce('image-source-code');
    response = await gm.getPhotoData({
      photo_reference: 'imagereference',
      html_attributions: ['<a href="test">John Smith</a>'],
    });
  });

  it('returns the photo references in the correct format', () => {
    expect(Object.keys(response)).toEqual(expect.arrayContaining(['url', 'attribution']));
  });

  it('returns the attributers in the correct format', () => {
    expect(response.attribution).toBe('John Smith');
  });
});
