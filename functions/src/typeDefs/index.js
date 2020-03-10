const { query } = require("./query");
const { inputs } = require("./inputs");
const { locationType } = require("./types");

const typeDefs = [query, inputs, locationType];

module.exports = {
  typeDefs
};
