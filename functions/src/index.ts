import * as functions from 'firebase-functions';
import { ApolloServer } from 'apollo-server-cloud-functions';
import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';

import { LocationResolver } from './resolvers/location';
import { PubResolver } from './resolvers/pub';
import { GoogleMaps, Here } from './datasources';

import { config } from './config';
import { mocks } from './mocks';

const schema = buildSchemaSync({
  resolvers: [LocationResolver, PubResolver],
  emitSchemaFile: !config.in_prod,
  validate: false,
});

const dataSources = () => ({
  googleMaps: new GoogleMaps(),
  here: new Here(),
});

const server = new ApolloServer({
  schema,
  dataSources,
  cacheControl: {
    defaultMaxAge: 60,
  },
  mocks: config.mocks ? mocks : false,
});

const app = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});

export const graphql = functions.https.onRequest(app);
