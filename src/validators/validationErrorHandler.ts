'use strict';

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { BAD_REQUEST, getStatusText } from 'http-status-codes';

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => { // tslint:disable: max-line-length
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({
      error: {
        code: BAD_REQUEST,
        message: getStatusText(BAD_REQUEST),
        data: errors.array(),
      },
    });
  }
  return next();
};

export default validationErrorHandler;
