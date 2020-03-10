const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { resolvers } = require("./src/resolvers");
const { typeDefs } = require("./src/typeDefs");
const { GoogleMaps } = require("./src/datasources");

// const context = ({ req }) => ({ token: "token" });
const dataSources = () => ({
  googleMaps: new GoogleMaps()
});

const app = express();

app.use(cors({ origin: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
  // context
});
server.applyMiddleware({ app });

const api = functions.https.onRequest(app);

module.exports = { api };
