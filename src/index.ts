'use strict';

import app from './app';
import winston from './utils/logger/winston';
require('dotenv').config();

/* LOCAL CONFIG */
const BASE_URL = process.env.BASE_URL;
const PORT = app.get('port');
const ENV = app.get('env');

/**
 * Starts the server on the provided port
 */
const server = app.listen(
  PORT,
  () => {
    console.log(
      'App is running on %s:%d in %s mode',
      BASE_URL,
      PORT,
      ENV,
      '\nPress CTRL-C to stop',
    );
    winston.debug(`App is running on ${BASE_URL}:${PORT} in ${ENV} mode`);
  },
);

export default server;
