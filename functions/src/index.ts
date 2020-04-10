import * as functions from 'firebase-functions';
import { ApolloServer, gql } from 'apollo-server-cloud-functions';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import { LocationResolver } from './resolvers/location';
import { PubResolver } from './resolvers/pub';
import { GoogleMaps } from './datasources/googleMaps';

import { config } from './config';
import { mocks } from './mocks';

const main = async (req, res) => {
  const schema = await buildSchema({
    resolvers: [LocationResolver, PubResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const dataSources = () => ({
    googleMaps: new GoogleMaps(),
  });

  const server = new ApolloServer({
    schema,
    dataSources,
    mocks: config.env.mocks ? mocks : false,
  });

  const app = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  app(req, res);
};

export const graphql = functions.https.onRequest(main);
