import * as functions from 'firebase-functions';
import fs from 'fs';

export interface Config {
  env: {
    google: {
      key: string;
      maps_uri: string;
    };
  };
  mocks?: boolean;
  in_prod: boolean;
}

const in_prod = process.env.NODE_ENV === 'production';

export const config: Config = {
  env: in_prod
    ? { ...functions.config().env }
    : fs.existsSync('./.env.json')
    ? require('../.env.json')
    : { google: { key: '', maps_uri: '' } },
  in_prod,
  mocks: !!process.env.MOCK,
};
