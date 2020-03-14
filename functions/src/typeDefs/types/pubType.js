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
    openingHours: Days
  }

  type Days {
    _0: OpeningHours!
    _1: OpeningHours!
    _2: OpeningHours!
    _3: OpeningHours!
    _4: OpeningHours!
    _5: OpeningHours!
    _6: OpeningHours!
  }

  type OpeningHours {
    opens: String
    closes: String
  }
`;

module.exports = {
  pubType
};

const days = {
  "0": { open: "1200", close: "2230" },
  "1": { open: "1200", close: "0000" },
  "2": { open: "1200", close: "0000" },
  "3": { open: "1200", close: "0000" },
  "4": { open: "1200", close: "0000" },
  "5": { open: "1200", close: "0200" },
  "6": { open: "1100", close: "0200" }
};
