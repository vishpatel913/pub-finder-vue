import Here from '../here';
import { geocodingMockResponse } from './mocks';

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
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(geocodingMockResponse);
    response = await here.getGeocoding({ lat: 7, lng: 12 });
  });

  it('returns an object with the correct keys', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining([
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
        address: '66 Sisters Avenue, London, SW11 1, England',
        district: 'Battersea',
        city: 'London',
        county: 'London',
        postalCode: 'SW11',
      })
    );
  });
});
