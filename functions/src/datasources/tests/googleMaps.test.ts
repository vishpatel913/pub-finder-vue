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
    response = await gm.getPubsNear({ lat: 54.9, lng: -1.6 });
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
        'https://www.google.com/maps/search/?api=1&query=54.9900241,-1.606599&query_place_id=ChIJUcgKA9lwfkgRz34D578dDQc',
      directions:
        'https://www.google.com/maps/dir/?api=1&origin=54.9,-1.6&destination=Bar%20Blanc&destination_place_id=ChIJUcgKA9lwfkgRz34D578dDQc&travelmode=walking',
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

  it('returns the correct opentime when given an iso string', async () => {
    const newResponse = await gm.getPubDetails('TEST_UUID', {
      date: '2020-03-31T20:47:41+01:00',
    });
    expect(newResponse.openTimes).toHaveLength(1);
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
