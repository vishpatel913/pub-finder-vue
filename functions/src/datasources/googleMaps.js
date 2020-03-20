const { RESTDataSource } = require("apollo-datasource-rest");
const config = require("../../config");

class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.google.maps_uri}/`;
  }

  // async willSendRequest(request) {}

  async getGeocoding({ lat, lng }) {
    const params = {
      latlng: `${lat},${lng}`,
      key: config.google.key
    };
    const response = await this.get("geocode/json", params);
    const { formatted_address } = response.results[0];

    const normalisedResult = response.results.reduce((result, item) => {
      if (item.types.includes("administrative_area_level_3"))
        result.borough = item.address_components[0].long_name;
      if (item.types.includes("administrative_area_level_2"))
        result.county = item.address_components[0].long_name;
      if (item.types.includes("postal_code_prefix"))
        result.postalArea = item.formatted_address;
      if (item.types.includes("neighborhood"))
        result.neighborhood = item.address_components[0].long_name;
      // NOTE: The brixton area problem lol
      // if (item.types.includes("street_address"))
      //   result.neighborhood = item.address_components.find(item =>
      //     item.types.includes("neighborhood")
      //   ).long_name;
      if (item.types.includes("sublocality"))
        result.area = item.address_components[0].long_name;
      else if (!result.area && item.types.includes("locality"))
        result.area = item.address_components[0].long_name;

      return result;
    }, {});

    const {
      borough,
      county,
      postalArea,
      area,
      neighborhood
    } = normalisedResult;

    return {
      address: formatted_address,
      borough,
      county,
      postalArea,
      area: neighborhood || area
    };
  }

  async getPubsNear({ lat, lng }, data = {}) {
    const params = {
      location: `${lat},${lng}`,
      radius: "1500",
      keyword: "pub,bar",
      opennow: true,
      ...data,
      key: config.google.key
    };
    const response = await this.get("place/nearbysearch/json", params);

    return response.results.map(item => ({
      id: item.place_id,
      name: item.name,
      coords: item.geometry.location,
      address: item.vicinity,
      rating: item.rating,
      priceLevel: item.price_level
    }));
  }

  async getPubDetails(id) {
    const params = {
      place_id: id,
      fields: "opening_hours,photos",
      key: config.google.key
    };
    const response = await this.get("place/details/json", params);
    const { opening_hours } = response.result;

    return {
      openTimes: opening_hours.periods
    };
  }
}

module.exports = GoogleMaps;
