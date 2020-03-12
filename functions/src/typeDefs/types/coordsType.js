const { gql } = require("apollo-server-express");

const coordsType = gql`
  type Coords {
    lat: Float
    lng: Float
  }
`;

module.exports = {
  coordsType
};
