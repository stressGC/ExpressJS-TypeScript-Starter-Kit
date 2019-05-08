"use strict";
import { Request, Response } from "express";
import NumberSchema from '../../models/Number';
import logger from '../../utils/logger/winston';

export default (req: Request, res: Response) => {
  const result : Number = req.params.number;
  console.log(NumberSchema.getRandom(0, 12));
  logger.error(`number is ${result}`);
  return res.status(200).send({ result });
};