"use strict";

import * as Boom from "@hapi/boom";
import { Response } from 'express';

/**
 * Fetches a Boom error and sends the appropriate HTTP Response back
 *
 * @param {Response} res
 * @param {Boom<any>} boomError
 * @returns
 */
const errorHandler = (res: Response, boomError: Boom<any>) => {
  return res.status(boomError.output.statusCode).json(boomError.output.payload);
};

export default errorHandler;