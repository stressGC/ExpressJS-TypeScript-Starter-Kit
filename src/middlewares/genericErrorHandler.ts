"use strict";

import { Response, Request, NextFunction } from 'express';
import logger from './../utils/logger/winston';

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param {*} err
 * @param {Request} req
 * @param {Response} res
 */
const genericErrorHandler = (err: any, _req: Request, res: Response): Response => {
  logger.debug(err.output.payload.message);

  if (err.isBoom) {
    return res.status(err.output.statusCode).json({
      error: {
        code: err.output.statusCode,
        message: err.output.payload.message || err.output.payload.error
      }
    });
  }

  return res.status(500).json({
    error: {
      code: 500,
      message: "Internal Error"
    }
  });
}
export default genericErrorHandler;