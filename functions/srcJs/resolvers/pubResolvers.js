const pubResolvers = {
  Query: {
    pubs: async (parent, { coords, first }, { dataSources }) => {
      const results = await dataSources.googleMaps.getPubsNear(coords, {
        first
      });

      return results;
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
    openTimes: async ({ id }, { date }, { dataSources }) => {
      const details = await dataSources.googleMaps.getPubDetails(id, {
        today: date
      });

      return details.openTimes;
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
