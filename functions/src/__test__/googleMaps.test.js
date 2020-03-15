const GoogleMaps = require("../datasources/googleMaps");
const {
  geocodingMockResponse,
  placeDetailsMockResponse,
  placesMockResponse
} = require("./mocks/placesMock");

const gm = new GoogleMaps();
const mocks = {
  get: jest.fn()
};
gm.get = mocks.get;
let response;

describe("[GoogleMaps.getGeocoding]", () => {
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(geocodingMockResponse);
    response = await gm.getGeocoding({ lat: 7, lng: 12 });
  });

  it("returns an object with the correct keys", () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining(["address", "components"])
    );
  });

  it("returns the geocoding data in the correct format", () => {
    expect(response).toEqual(
      expect.objectContaining({
        address: "66 Sisters Ave, London SW11 5SN, UK",
        area: "London Borough of Wandsworth"
      })
    );
    expect(Object.keys(response.components)).toEqual(
      expect.arrayContaining([
        "streetNumber",
        "route",
        "postalTown",
        "postalCode"
      ])
    );
  });
});

describe("[GoogleMaps.getPubsNear]", () => {
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(placesMockResponse);
    response = await gm.getPubsNear({ lat: 7, lng: 12 });
  });

  it("returns a list with the correct amount of pubs", () => {
    expect(response).toHaveLength(2);
  });

  it("returns a list of pubs in the correct format", () => {
    expect(response[0]).toEqual(
      expect.objectContaining({
        name: "Osbornes",
        address: "61-73 Osborne Rd, Jesmond, Newcastle upon Tyne",
        rating: 4.1,
        priceLevel: 2
      })
    );
  });
});

describe("[GoogleMaps.getPubDetails]", () => {
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(placeDetailsMockResponse);
    response = await gm.getPubDetails("uuiid");
  });

  it("returns an object with the correct keys", async () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining(["openingHours"])
    );
  });

  it("returns the opening hours with the correct keys", () => {
    expect(Object.keys(response.openingHours)).toEqual(
      expect.arrayContaining(["0", "1", "2", "3", "4", "5", "6"])
    );
  });

  it("returns a day object in the correct format", () => {
    expect(response.openingHours[0]).toEqual(
      expect.objectContaining({ opens: "1200", closes: "2230" })
    );
    expect(response.openingHours[6]).toEqual(
      expect.objectContaining({ opens: "1100", closes: "0200" })
    );
  });
});
