"use strict";

import { Response, Request, NextFunction } from 'express';
import logger from './../utils/logger/winston';

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param {*} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const genericErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.debug(err.output.payload.message);
  console.log(err.output.payload.message)
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      error: {
        code: err.output.statusCode,
        message: err.output.payload.message || err.output.payload.error
      }
    });
  }

  res.status(500).json({
    error: {
      code: 500,
      message: "Internal Error"
    }
  });
}
export default genericErrorHandler;