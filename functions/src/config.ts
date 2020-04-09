import * as functions from 'firebase-functions';
import fs from 'fs';

export interface EnvVars {
  google?: string;
  // {
  //   key: string;
  //   maps_uri: string;
  // };
}

export const env = (): EnvVars => {
  if (process.env.NODE_ENV === 'production') {
    return functions.config().env;
  } else if (fs.existsSync('../.env.json')) {
    return require('../.env.json');
  } else {
    return { google: undefined };
  }
};
