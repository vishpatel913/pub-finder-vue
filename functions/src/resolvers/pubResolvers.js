const moment = require("moment");
const { distanceBetweenCoords } = require("../utils");

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
    openTimes: async ({ id }, args, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);
      return details.openTimes;
    },
    openTimesToday: async ({ id }, args, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);
      const now = moment();
      return details.openTimes.find(item => {
        const { open, close } = item;
        return (
          moment(`${open.day} ${open.time}`, "e HHmm").isBefore(now) &&
          moment(`${close.day} ${close.time}`, "e HHmm").isAfter(now)
        );
      });
    }
  }
};

module.exports = {
  pubResolvers
};
