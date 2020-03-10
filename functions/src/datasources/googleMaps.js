const { RESTDataSource } = require("apollo-datasource-rest");
const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");
const config = require("../../config");

class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.google.mapsUri}/`;
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

  async getPubsNearMe({ lat, lng }) {
    // const params = {};
    // const response = await this.get("place", params);
    // return response;
  }

  async getPubDetails(id) {
    // const params = {};
    // const response = await this.get("place-details", params);
    // return response;
  }
}

module.exports = GoogleMaps;
