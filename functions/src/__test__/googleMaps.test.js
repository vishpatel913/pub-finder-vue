const GoogleMaps = require("../datasources/googleMaps");
const {
  placesMockResponse,
  placeDetailsMockResponse
} = require("./mocks/placesMock");
const { geocodingMockResponse } = require("./mocks/geocodeMock");

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
      expect.arrayContaining([
        "address",
        "area",
        "borough",
        "county",
        "postalArea"
      ])
    );
  });

  it("returns the geocoding data in the correct format", () => {
    expect(response).toEqual(
      expect.objectContaining({
        address: "66 Sisters Ave, London SW11 5SN, UK",
        area: "London",
        borough: "London Borough of Wandsworth",
        county: "Greater London",
        postalArea: "London SW11, UK"
      })
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
      expect.arrayContaining(["openTimes"])
    );
  });

  it("returns the opening hours with the correct keys", () => {
    expect(Object.keys(response.openTimes)).toEqual(
      expect.arrayContaining(["0", "1", "2", "3", "4", "5", "6"])
    );
  });

  it("returns a day object in the correct format", () => {
    expect(response.openTimes[0]).toMatchObject({
      open: {
        day: 0,
        time: "1000"
      },
      close: {
        day: 0,
        time: "2230"
      }
    });
    expect(response.openTimes[6]).toMatchObject({
      open: {
        day: 6,
        time: "1000"
      },
      close: {
        day: 6,
        time: "2300"
      }
    });
  });

  it("returns the photo references in the correct format", () => {
    expect(Object.keys(response.photos[0])).toEqual(
      expect.arrayContaining(["reference", "width", "height", "attributions"])
    );
  });

  it("returns the attributers in the correct format", () => {
    expect(response.photos[0].attributions[0]).toBe("Osbornes");
  });
});
