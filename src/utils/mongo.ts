import * as mongoose from 'mongoose';
import winston from './logger/winston';

require('dotenv').config();

// Mongo options
const options = {
  useNewUrlParser: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

/**
 * initialise mongoDB connection
 */
const init = () => {

  /* remove deprecated options */
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  const DB_NAME = process.env.NODE_ENV === 'test' ?
    process.env.MONGO_TEST_DB
    :
    process.env.MONGO_DB;

  /* connect */
  mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_HOST}/${DB_NAME}`,
    options,
    (err) => {
      if (err) {
        winston.error(`Error while connecting to MongoDB: ${err}`);
        return process.exit(0);
      }

      winston.debug('Connected to MongoDB');

    /* close mongo connection on SIGINT */
      mongoose.connection.on('error', err => winston.error(`MongoDB error: ${err}`));
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          return process.exit(0);
        });
      });
    },
  );
};

export default {
  init,
};
