import * as mongoose from 'mongoose';
import logger from './../logger/winston';

require('dotenv').config();

// Mongo options
const options = {
  useNewUrlParser: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

/**
 * initialize mongoDB connection
 */
const initialize = () : void => {
  /* remove deprecated options */
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  /* connect */
  mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, options, err => {
    if (err) {
      logger.error(`Error while connecting to MongoDB: ${err}`);
      process.exit(1);
    }

    logger.debug(`Connected to MongoDB`);

    /* close mongo connection on SIGINT */
    mongoose.connection.on('error', err => logger.error(`MongoDB error: ${err}`));
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });
  });
};

export default initialize;
