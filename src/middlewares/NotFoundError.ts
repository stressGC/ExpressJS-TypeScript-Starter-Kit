"use strict";

import { Request, Response } from 'express';

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 */
const notFoundErrorHandler = (_req: Request, res: Response): Response => {
  return res.status(404).json({
    error: {
      code: 404,
      message: "Error 404: Not Found",
    }
  });
};

export default notFoundErrorHandler;