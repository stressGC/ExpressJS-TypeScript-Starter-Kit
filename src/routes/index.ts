import numbersRouter from '../routes/numbers';
import { Express } from 'express';

export default (app : Express) => {
  app.use('/numbers', numbersRouter);
};
