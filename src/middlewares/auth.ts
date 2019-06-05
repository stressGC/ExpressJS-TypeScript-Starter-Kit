import * as jwt from 'jsonwebtoken';
import winston from '../utils/logger/winston';
import { Response, Request, NextFunction } from 'express';
import * as Boom from '@hapi/boom';
import { getStatusText, UNAUTHORIZED } from 'http-status-codes';
require('dotenv').config();

// encryption key
const { JWT_SECRET_KEY } = process.env;

const tokenExists = (req: Request, res: Response, next: NextFunction): void => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;

  // FORMAT OF TOKEN
  // Authorization: Bearer <access_token>

  // Check if bearer is undefined, auth fails
  if (typeof bearerHeader === 'undefined') {
    winston.debug('Access Forbidden : token missing');
    next(Boom.unauthorized(getStatusText(UNAUTHORIZED)));
  }

  try {
    // extract the token
    req.context.token = bearerHeader.split(' ')[1];
    winston.debug('Token found :', req.context.token);
    next();
  } catch (e) {
    winston.debug('Access Forbidden : token cant be parsed');
    next(Boom.unauthorized(getStatusText(UNAUTHORIZED)));
  }
};

const tokenIsLegit = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.context;
  jwt.verify(token, JWT_SECRET_KEY, (err: jwt.VerifyErrors, authData: object) => {
    if (err) {
      winston.debug('JWT err: ', err);
      return next(Boom.unauthorized(getStatusText(UNAUTHORIZED)));
    }
    req.context.authData = authData;
    winston.debug(authData);
    return next();
  });
};

export const isAuth = [tokenExists, tokenIsLegit];
