const { gql } = require("apollo-server-express");

const query = gql`
  type Query {
    location(coords: Coords): Location
  }
`;

module.exports = {
  query
};
