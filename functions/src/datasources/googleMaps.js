const { RESTDataSource } = require("apollo-datasource-rest");
const config = require("../../config");
const { toCamelCase } = require("../utils/helpers");

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
    const { formatted_address, address_components } = response.results[0];

    return {
      address: formatted_address,
      area: response.results.find(item =>
        item.formatted_address.match(/^([^0-9]*)$/g)
      ).address_components[0].long_name,
      components: address_components.reduce((p, c) => {
        p[toCamelCase(c.types[0])] = c.long_name;
        return p;
      }, {})
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
      openingHours: await this.constructor.normaliseOpeningTimes(
        opening_hours.periods
      )
    };
  }

  static async normaliseOpeningTimes(periods) {
    const days = periods.reduce((p, c) => {
      p.push({ opens: c.open.time, closes: c.close.time });
      return p;
    }, []);

    return days;
  }
}

module.exports = GoogleMaps;
