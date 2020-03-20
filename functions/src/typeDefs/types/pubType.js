const { gql } = require("apollo-server-express");

const pubType = gql`
  type Pub {
    id: String!
    name: String!
    coords: Coords!
    address: String!
    rating: Float
    priceLevel: Int
    distance: Float
    openTimes: [OpenTimes]
    openTimesToday: OpenTimes
  }

  type OpenTimes {
    open: DayTime
    close: DayTime
  }

  type DayTime {
    day: String
    time: String
  }
`;

module.exports = {
  pubType
};
