import * as functions from 'firebase-functions';
import { ApolloServer, gql } from 'apollo-server-cloud-functions';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import { LocationResolver } from './resolvers/location';
import { PubResolver } from './resolvers/pub';

import { mocks } from './mocks';

const main = async (req, res) => {
  const schema = await buildSchema({
    resolvers: [LocationResolver, PubResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    mocks,
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
// export const test = functions.https.onRequest(async (request, response) => {
//   response.send('Hello from Firebase!\n\n');
// });
