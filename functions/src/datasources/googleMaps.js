const { RESTDataSource } = require("apollo-datasource-rest");
const moment = require("moment");
const { distanceBetweenCoords, bearingBetweenCoords } = require("../utils");
const config = require("../../config");

class GoogleMaps extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.google.maps_uri}/`;
  }

  // async willSendRequest(request) {}

  async didReceiveResponse(response) {
    let body = await this.parseBody(response);
    if (response.url.includes("googleusercontent")) {
      body = { url: await response.url };
    }

    return { ...body };
  }

  async getGeocoding({ lat, lng }) {
    const params = {
      key: config.google.key,
      latlng: `${lat},${lng}`
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

  async getPubsNear({ lat, lng }, options = {}) {
    const params = {
      key: config.google.key,
      location: `${lat},${lng}`,
      radius: "1500",
      keyword: "pub,bar",
      opennow: true
    };
    const response = await this.get("place/nearbysearch/json", params);

    return response.results
      .map(item => ({
        id: item.place_id,
        name: item.name,
        coords: item.geometry.location,
        address: item.vicinity,
        rating: item.rating,
        priceLevel: item.price_level,
        photos: item.photos
      }))
      .sort((a, b) =>
        distanceBetweenCoords({ lat }, a.coords) >
        distanceBetweenCoords({ lat }, b.coords)
          ? 1
          : -1
      )
      .slice(0, options.first || response.results.length);
  }

  async getPubDetails(id, options = {}) {
    const params = {
      key: config.google.key,
      place_id: id,
      fields:
        "place_id,name,geometry,vicinity,rating,price_level,opening_hours,photos"
    };
    const response = await this.get("place/details/json", params);
    const {
      place_id,
      name,
      geometry,
      vicinity,
      rating,
      price_level,
      opening_hours,
      photos
    } = response.result;

    const openTimes = options.today
      ? opening_hours.periods.filter(item => {
          const { open, close } = item;
          console.log(name, open.day, close.day);
          const today = moment(options.today);
          const openMoment = moment(`${open.day} ${open.time}`, "e HHmm");
          const closeMoment = moment(`${close.day} ${close.time}`, "e HHmm");
          // If opens on Sat and closes on Sun
          if (close.day < open.day) {
            if (today.day() === 6) closeMoment.add(1, "w"); // closes 'next week'
            if (today.day() === 0) openMoment.subtract(1, "w"); // opened 'last week'
          }

          return (
            openMoment.isBefore(options.today) &&
            closeMoment.isAfter(options.today)
          );
        })
      : opening_hours.periods;

    return {
      id: place_id,
      name,
      coords: geometry.location,
      address: vicinity,
      rating,
      priceLevel: price_level,
      openTimes,
      photos
    };
  }

  async getDirections(origin, dest) {
    const params = {
      key: config.google.key,
      mode: "walking",
      origin: Object.values(origin).join(","),
      destination: Object.values(dest).join(",")
    };

    const response = await this.get("directions/json", params);
    const { legs } = response.routes[0];

    return {
      distance: legs[0].distance.value,
      duration: legs[0].duration.value,
      bearing: bearingBetweenCoords(origin, dest)
    };
  }

  async getPhotoSrcUrl({ photo_reference, html_attributions }, size = 500) {
    const params = {
      key: config.google.key,
      photoreference: photo_reference,
      maxwidth: size,
      maxheight: size
    };

    const response = await this.get("place/photo", params);

    return {
      url: response.url,
      attribution: html_attributions[0].replace(/<\s*a[^>]*>|<\s*\/\s*a>/g, "")
    };
  }
}

module.exports = GoogleMaps;
