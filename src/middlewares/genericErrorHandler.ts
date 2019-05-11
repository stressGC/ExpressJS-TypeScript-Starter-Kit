"use strict";

import { Response, Request, NextFunction } from 'express';
import logger from './../utils/logger/winston';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

/**
 * Generic error response middleware for validation and internal server errors
 *
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 */
const genericErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): Response => {
  logger.debug(err.output.payload.message);
  if (err.isBoom) {
    return res.status(err.output.statusCode).json({
      error: {
        code: err.output.statusCode,
        message: err.output.payload.message || err.output.payload.error,
      }
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    error: {
      code: INTERNAL_SERVER_ERROR,
      message: getStatusText(INTERNAL_SERVER_ERROR),
    }
  });
}

export default genericErrorHandler;