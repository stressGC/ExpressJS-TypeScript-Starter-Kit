"use strict";

import { Request, Response } from "express";
import { OK } from 'http-status-codes';
import logger from '../../utils/logger/winston';

/**
 * Handler that echoes the user input
 * @param {Request} req
 * @param {Response} res
 * @returns {Request}
 */
export default (req: Request, res: Response): Response => {
  const result: Number = req.params.number;
  console.log(result)
  logger.error(`number is ${result}`);
  return res.status(OK).send({ result });
};