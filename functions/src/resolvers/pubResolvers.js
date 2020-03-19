const { distanceBetweenCoords } = require("../utils/helpers");

const pubResolvers = {
  Query: {
    pubs: async (parent, { coords }, { dataSources }) => {
      const results = await dataSources.googleMaps.getPubsNear(coords);
      return results
        .map(item => ({
          ...item,
          distance: distanceBetweenCoords(coords, item.coords)
        }))
        .sort((a, b) => (a.distance > b.distance ? 1 : -1));
    }
  },
  Pub: {
    openingHours: async ({ id }, args, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);
      return details.openingHours;
    }
  }
};

module.exports = {
  pubResolvers
};
