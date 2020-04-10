import * as functions from 'firebase-functions';
import fs from 'fs';
import { firebaseConfig } from 'firebase-functions';

export interface Config {
  env: {
    google: {
      key: string;
      maps_uri: string;
    };
    mocks?: boolean;
  };
}

const in_prod = process.env.NODE_ENV === 'production';

export const config: Config = {
  env: in_prod
    ? { ...functions.config().env, mocks: false }
    : fs.existsSync('./.env.json')
    ? require('../.env.json')
    : { google: undefined, mocks: true },
};
