const { gql } = require("apollo-server-express");

const locationType = gql`
  type Location {
    address: String!
    area: String
    borough: String
    county: String
    postalArea: String
  }
`;

module.exports = {
  locationType
};
