const locationResolvers = {
  Query: {
    location: (parent, { coords }, { dataSources }, info) =>
      dataSources.googleMaps.getGeocoding(coords)
  }
};

module.exports = {
  locationResolvers
};
