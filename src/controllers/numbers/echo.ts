"use strict";
import { Request, Response, NextFunction } from "express";
import NumberSchema from '../../models/Number';
import logger from '../../utils/logger/winston';

export default (req: Request, res: Response, next: NextFunction) => {
  const result : Number = req.params.number;
  console.log(NumberSchema.getRandom(0, 12));
  logger.error(`number is ${result}`);
  return res.status(200).send({ result });
};