"use strict";
import numbersRouter from '../routes/numbers';
import wordsRouter from '../routes/words';
import { Express } from 'express';
import * as express from 'express';
import * as path from 'path';

/**
 * Initialise all routes
 *
 * @param {Express} app
 */
const createRoutes = (app: Express): void => {
  /* expose public folder */
  app.use('/public', express.static(path.join(__dirname, '../../public')));

  /* use our subrouters */
  app.use('/numbers', numbersRouter);
  app.use('/words', wordsRouter);
};

export default createRoutes;
