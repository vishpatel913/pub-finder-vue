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
    directions: async (
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

        return directions;
      } catch {
        return null;
      }
    },
    openTimes: async ({ id }, { now }, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id);

      return now
        ? [
            details.openTimes.find(item => {
              const { open, close } = item;
              const today = moment(now);
              const openMoment = moment(`${open.day} ${open.time}`, "e HHmm");
              const closeMoment = moment(
                `${close.day} ${close.time}`,
                "e HHmm"
              );
              // If opens on Sat and closes on Sun
              if (close.day < open.day) {
                if (today.day() === 6) closeMoment.add(1, "w"); // closes 'next week'
                if (today.day() === 0) openMoment.subtract(1, "w"); // opened 'last week'
              }

              return openMoment.isBefore(now) && closeMoment.isAfter(now);
            })
          ]
        : details.openTimes;
    },
    photos: async ({ photos }, { size }, { dataSources }) => {
      const images = photos.map(item =>
        dataSources.googleMaps.getPhotoSrcUrl(item, size)
      );

      return images;
    }
  }
};

module.exports = {
  pubResolvers
};
