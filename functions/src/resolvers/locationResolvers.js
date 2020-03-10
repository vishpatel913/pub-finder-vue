const locationResolvers = {
  Query: {
    location: (parent, args, ctx, info) =>
      ctx.dataSources.googleMaps.getGeocoding(args.coords)
  }
};

module.exports = {
  locationResolvers
};
