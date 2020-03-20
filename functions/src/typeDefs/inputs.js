const { gql } = require("apollo-server-express");

const inputs = gql`
  input CoordsInput {
    lat: Float!
    lng: Float!
  }

  input StringFilter {
    eq: String # equals
    ne: String # not equals
    in: [String!] # in
    nin: [String!] # non in
    regex: String
  }

  input IntFilter {
    eq: Int # equals
    ne: Int # not equals
    in: [String!] # in
    nin: [String!] # non in
    regex: String
  }
`;

module.exports = {
  inputs
};
