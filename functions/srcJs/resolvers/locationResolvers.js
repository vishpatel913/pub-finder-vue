const locationResolvers = {
  Query: {
    location: (parent, { coords }, { dataSources }) =>
      dataSources.googleMaps.getGeocoding(coords)
  }
};

module.exports = {
  locationResolvers
};
