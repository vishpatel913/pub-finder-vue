const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    location(coords: CoordsInput): Location
    pubs(coords: CoordsInput): [Pub]
  }
`;

module.exports = {
  query,
};
