import * as functions from 'firebase-functions';
import * as fs from 'fs';

export const config = () => {
  let envVars;
  if (process.env.NODE_ENV) {
    envVars = functions.config().env;
  } else {
    if (fs.existsSync('./.env.json')) {
      envVars = require('./.env.json');
    }
  }
  return { envVars };
};
