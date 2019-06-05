'use strict';

import User from '../../models/User';
import IUserDocument from '../../interfaces/IUserDocument';
import { ValidationChain, validationResult } from 'express-validator/check';
import * as Boom from '@hapi/boom';
import { getStatusText, INTERNAL_SERVER_ERROR, FORBIDDEN } from 'http-status-codes';
import { NextFunction, Response, Request } from 'express';
import { BODY } from '../index';

/* valid login request logic */
const VALID_LOGIN_REQUEST: ValidationChain[] = [
  BODY.MISSING_EMAIL,
  BODY.MISSING_PASSWORD,
];

/**
 * checks if the provided credentials are correct
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
const credentialsMatches = (req: Request, res: Response, next: NextFunction) => {
  // bad request, no need to continue
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(Boom.forbidden(getStatusText(FORBIDDEN)));

  const { email, password } = req.body;

  User.findOne({ email }, (err: any, user: IUserDocument) => {
    // internal error
    if (err) return next(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));

    // no user found
    if (!user) return next(Boom.forbidden(getStatusText(FORBIDDEN)));

    // passwords dont match
    if (!user.comparePassword(password)) return next(Boom.forbidden(getStatusText(FORBIDDEN)));

    // format user and remove unwanted infos
    const formattedUser = { ...user._doc };
    delete formattedUser.password;
    delete formattedUser.__v;
    req.context = { user: formattedUser };
    next();
  });
};

/**
 * validates a user login
 * @param userID
 * @userID is valid MongoID
 * @email is present & valid email
 * @password is valid & matches
 */
const validCredentials = [
  ...VALID_LOGIN_REQUEST,
  credentialsMatches,
];

export default validCredentials;
