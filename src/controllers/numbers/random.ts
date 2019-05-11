'use strict';

import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import NumberSchema from '../../models/Number';

/**
 * Utility function that returns an Number between 0 & 500
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Number} random Number between 0 & 500
 */
const random = (_req: Request, res: Response): Response => {
  const result: Number = NumberSchema.getRandom(0, 500);
  return res.status(OK).send({ result });
};

export default random;