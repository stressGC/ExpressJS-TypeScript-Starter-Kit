import User from '../models/User';
import IUserDocument from '../interfaces/IUserDocument';
import { ValidationChain, body, param } from 'express-validator/check';
import * as lang from '../utils/lang';
import * as Boom from '@hapi/boom';
import { getStatusText, INTERNAL_SERVER_ERROR, FORBIDDEN } from 'http-status-codes';
import { NextFunction, Response, Request } from 'express';

/**
 * returns a 'is_present' validator based of fieldName
 *
 * @param {string} fieldName
 */
export const exists = (fieldName: string, where: 'body' | 'param') => {
  if (where === 'param') return param(fieldName, lang.fieldMissing(fieldName)).exists();
  return body(fieldName, lang.fieldMissing(fieldName)).exists();
};

const MISSING_EMAIL: ValidationChain = exists('email', 'body');
const MISSING_PASSWORD: ValidationChain = exists('password', 'body');

// valid login wrapper
const VALID_LOGIN_REQUEST: ValidationChain[] = [
  MISSING_EMAIL,
  MISSING_PASSWORD,
];

const MATCHING_CREDENTIALS = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err: any, user: IUserDocument) => {
    // internal error
    if (err) return next(Boom.internal(getStatusText(INTERNAL_SERVER_ERROR)));

    // no user found
    if (!user) return next(Boom.forbidden(getStatusText(FORBIDDEN)));

    // passwords dont match
    if (!user.comparePassword(password)) return next(Boom.forbidden(getStatusText(FORBIDDEN)));
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
export const validateCredentials = [
  ...VALID_LOGIN_REQUEST,
  MATCHING_CREDENTIALS,
];
