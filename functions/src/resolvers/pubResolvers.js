const moment = require("moment");
const { distanceBetweenCoords } = require("../utils");

const pubResolvers = {
  Query: {
    pubs: async (parent, { coords, first }, { dataSources }) => {
      const results = await dataSources.googleMaps.getPubsNear(coords);
      return results
        .sort((a, b) =>
          distanceBetweenCoords(coords, a.coords) >
          distanceBetweenCoords(coords, b.coords)
            ? 1
            : -1
        )
        .slice(0, first || results.length);
    },
    pub: async (parent, { id }, { dataSources }) => {
      return dataSources.googleMaps.getPubDetails(id);
    }
  },
  Pub: {
    distance: async (
      { coords },
      { from },
      { dataSources },
      { variableValues }
    ) => {
      try {
        const directions = await dataSources.googleMaps.getDirections(
          from || variableValues.coords,
          coords
        );
        return directions.distance;
      } catch {
        return null;
      }
    },
    openTimes: async ({ id }, args, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);
      return details.openTimes;
    },
    photos: async ({ id }, args, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);
      return details.photos;
    },
    openTimesToday: async ({ id }, args, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);
      const now = moment();
      return details.openTimes.find(item => {
        const { open, close } = item;

        const openMoment = moment(`${open.day} ${open.time}`, "e HHmm");
        const closeMoment = moment(`${close.day} ${close.time}`, "e HHmm");
        if (open.day !== 6 && close.day < open.day) closeMoment.add(1, "w");
        if (close.day === 0 && close.day < open.day)
          openMoment.subtract(1, "w");

        return openMoment.isBefore(now) && closeMoment.isAfter(now);
      });
    }
  }
};

module.exports = {
  pubResolvers
};
