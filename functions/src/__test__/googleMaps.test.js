const GoogleMaps = require("../datasources/googleMaps");
const { placeDetailsMockResponse } = require("./mocks/placesMock");

const gm = new GoogleMaps();
const mocks = {
  get: jest.fn()
};
gm.get = mocks.get;
let response;

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
      expect.arrayContaining(["_0", "_1", "_2", "_3", "_4", "_5", "_6"])
    );
  });

  it("returns a day object in the correct format", () => {
    expect(response.openingHours["_0"]).toEqual(
      expect.objectContaining({ opens: "1200", closes: "2230" })
    );
    expect(response.openingHours["_6"]).toEqual(
      expect.objectContaining({ opens: "1100", closes: "0200" })
    );
  });
});
