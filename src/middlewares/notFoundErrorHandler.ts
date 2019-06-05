'use strict';

import { NOT_FOUND, getStatusText } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

/**
 * Error response middleware for 404 not found
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(NOT_FOUND).json({
    error: {
      code: NOT_FOUND,
      message: getStatusText(NOT_FOUND),
    }
  });
};

export default notFoundErrorHandler;