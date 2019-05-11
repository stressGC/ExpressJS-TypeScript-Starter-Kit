"use strict";

import { NOT_FOUND, getStatusText } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

/**
 * Error response middleware for 404 not found
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 */
const notFoundErrorHandler = (_req: Request, res: Response, _next: NextFunction): Response => {
  return res.status(NOT_FOUND).json({
    error: {
      code: NOT_FOUND,
      message: getStatusText(NOT_FOUND),
    }
  });
};

export default notFoundErrorHandler;