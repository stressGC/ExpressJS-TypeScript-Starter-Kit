"use strict";
import numbersRouter from '../routes/numbers';
import wordsRouter from '../routes/words';
import { Express } from 'express';

export default (app : Express) => {
  app.use('/numbers', numbersRouter);
  app.use('/words', wordsRouter);
};
