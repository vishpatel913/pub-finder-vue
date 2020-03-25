const { gql } = require("apollo-server-express");

const query = gql`
  type Query {
    location(coords: CoordsInput): Location
    pubs(coords: CoordsInput): [Pub]
    pub(id: String): Pub
  }
`;

module.exports = {
  query
};
