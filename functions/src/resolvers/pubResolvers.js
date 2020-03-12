const { distanceBetweenCoords } = require("../utils/helpers");

const pubResolvers = {
  Query: {
    pubs: async (parent, { coords }, { dataSources }, info) => {
      const results = await dataSources.googleMaps.getPubsNearMe(coords);
      return results
        .map(item => ({
          ...item,
          distance: distanceBetweenCoords(coords, item.coords)
        }))
        .sort((a, b) => (a.distance > b.distance ? 1 : -1));
    }
  }
};

module.exports = {
  pubResolvers
};
