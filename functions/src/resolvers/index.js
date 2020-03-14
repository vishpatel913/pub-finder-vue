const { locationResolvers } = require('./locationResolvers');
const { pubResolvers } = require('./pubResolvers');

const resolvers = [locationResolvers, pubResolvers];

module.exports = {
  resolvers,
};
