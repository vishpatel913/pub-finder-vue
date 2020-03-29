const functions = require("firebase-functions");
const fs = require("fs");

let config;
switch (process.env.NODE_ENV) {
  case "production":
    config = functions.config().env;
    config.mocks = false;
    break;
  case "test":
    config = {
      google: {
        key: "meh",
        maps_uri: "httpsomething"
      },
      mocks: true
    };
    break;
  default:
    if (fs.existsSync("./.env.json")) {
      const env = require("./.env.json");
      config = env;
    }
}

module.exports = config;
