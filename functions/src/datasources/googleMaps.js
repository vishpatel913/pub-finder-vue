const { RESTDataSource } = require("apollo-datasource-rest");
const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");
const config = require("../../config");

class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.google.maps_uri}/`;
  }

  async willSendRequest(request) {}

  async getGeocoding({ lat, lng }) {
    const params = {
      latlng: `${lat},${lng}`,
      key: config.google.key
    };
    const response = await this.get("geocode/json", params);
    const { formatted_address, address_components } = response.results[0];

    return {
      address: formatted_address,
      components: address_components.reduce((p, c) => {
        p[c.types[0]] = c.long_name;
        return p;
      }, {})
    };
  }

  async getPubsNearMe({ lat, lng }, data = {}) {
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
      key: config.GOOGLE_API_KEY
    };
    const response = await this.get("place/details/json", params);
  }
}

module.exports = GoogleMaps;
