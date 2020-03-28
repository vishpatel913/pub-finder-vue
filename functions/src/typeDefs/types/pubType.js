const { gql } = require("apollo-server-express");

const pubType = gql`
  type Pub {
    id: String!
    name: String!
    coords: Coords!
    address: String!
    rating: Float
    priceLevel: Int
    directions(from: CoordsInput): Direction
    openTimes: [OpenTimes]
    photos(size: Int): [Photo]
    openTimesToday: OpenTimes
  }

  type Direction {
    distance: Int
    duration: Int
    bearing: Float
  }

  type Photo {
    url: String
    attribution: String
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
