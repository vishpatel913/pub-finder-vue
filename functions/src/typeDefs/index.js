const { query } = require("./query");
const { inputs } = require("./inputs");
const { locationType, coordsType, pubType } = require("./types");

const typeDefs = [query, inputs, locationType, coordsType, pubType];

module.exports = {
  typeDefs
};
