const { distanceBetweenCoords } = require("../utils/helpers");

const pubResolvers = {
  Query: {
    pubs: (parent, { coords }, { dataSources }, info) =>
      dataSources.googleMaps.getPubsNearMe(coords)
  },
  Pub: {
    distance: (parent, args, ctx, info) =>
      distanceBetweenCoords(info.variableValues.coords, parent.coords)
  }
};

module.exports = {
  pubResolvers
};
