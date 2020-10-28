import GoogleMaps from '../googleMaps';
import { Pub, Direction, Photo } from '../../schemas';
import {
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

describe('[GoogleMaps.getPubsNear]', () => {
  let response: Pub[];
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
          id: 'ChIJL1U5qtlwfkgRfnCJa5aVYr4',
          name: 'Osbornes',
          address: '61-73 Osborne Rd, Jesmond, Newcastle upon Tyne',
          rating: 4.1,
          priceLevel: 2,
        }),
      ])
    );
  });

  it('builds and returns the correct google maps links', () => {
    expect(response[0].links).toEqual({
      place:
        'https://www.google.com/maps/search/?api=1&query=54.991135,-1.604484&query_place_id=ChIJL1U5qtlwfkgRfnCJa5aVYr4',
      directions:
        'https://www.google.com/maps/dir/?api=1&origin=7,12&destination=QVB&destination_place_id=ChIJL1U5qtlwfkgRfnCJa5aVYr4&travelmode=walking',
    });
  });
});

describe('[GoogleMaps.getPubDetails]', () => {
  let response: Pub;
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
  let response: Direction;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(directionsMockResponse);
    response = await gm.getDirections(
      { lat: 7, lng: 12 },
      { lat: 19, lng: 95 }
    );
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
  let response: Photo;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce('image-source-code');
    response = await gm.getPhotoData('imagereference', [
      '<a href="test">John Smith</a>',
    ]);
  });

  it('returns the photo references in the correct format', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining(['url', 'attribution'])
    );
  });

  it('returns the attributers in the correct format', () => {
    expect(response.attribution).toBe('John Smith');
  });
});
