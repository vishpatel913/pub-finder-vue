import Here from '../here';
import { geocodingMockResponse } from './mocks';
import { Location } from '../../schemas';

const here = new Here();
const mocks = {
  get: jest.fn(),
};

Object.defineProperty(here, 'get', { value: mocks.get });

describe('[Here]', () => {
  it('constructs with a base url', () => {
    expect(here.baseURL).not.toHaveLength(0);
  });
});

describe('[Here.getGeocoding]', () => {
  let response: Location;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(geocodingMockResponse);
    response = await here.getGeocoding({ lat: 7, lng: 12 });
  });

  it('returns an object with the correct keys', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining([
        'coords',
        'address',
        'district',
        'city',
        'county',
        'postalCode',
      ])
    );
  });

  it('returns the geocoding data in the correct format', () => {
    expect(response).toEqual(
      expect.objectContaining({
        coords: { lat: 51.46215, lng: -0.16971 },
        address: '66 Sisters Avenue, London, SW11 1, England',
        district: 'Battersea',
        city: 'London',
        county: 'London',
        postalCode: 'SW11',
      })
    );
  });
});

describe('[Here.getSearchResults]', () => {
  let response: Location[];
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(geocodingMockResponse);
    response = await here.getSearchResults('test query');
  });

  it('returns the search results data in the correct format', () => {
    expect(response).toHaveLength(1);
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          coords: { lat: 51.46215, lng: -0.16971 },
          address: '66 Sisters Avenue, London, SW11 1, England',
          district: 'Battersea',
          city: 'London',
          county: 'London',
          postalCode: 'SW11',
        }),
      ])
    );
  });
});
