const { gql } = require("apollo-server-express");

const query = gql`
  type Query {
    location(coords: CoordsInput): Location
    pubs(coords: CoordsInput, first: Int): [Pub]
    pub(id: String): Pub
  }
`;

module.exports = {
  query
};
