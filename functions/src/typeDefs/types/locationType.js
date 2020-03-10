const { gql } = require("apollo-server-express");

const locationType = gql`
  type Location {
    address: String!
    components: AddressComponent
  }

  type AddressComponent {
    street_number: String
    route: String
    postal_town: String
    administrative_area_level_2: String
    administrative_area_level_1: String
    country: String
    postal_code: String
  }
`;

module.exports = {
  locationType
};
