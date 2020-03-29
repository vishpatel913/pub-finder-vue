const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./src/typeDefs");
const { resolvers } = require("./src/resolvers");
const { GoogleMaps } = require("./src/datasources");
const { mocks } = require("./src/mocks");
const config = require("./config");

// const context = ({ req }) => ({ token: "token" });
const dataSources = () => ({
  googleMaps: new GoogleMaps()
});

const app = express();

app.use(cors);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
  // context
});
server.applyMiddleware({ app });

const api = functions.https.onRequest(app);

module.exports = { api };
