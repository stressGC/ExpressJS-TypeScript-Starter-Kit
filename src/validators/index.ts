'use strict';

import { body, param } from 'express-validator/check';
import * as lang from '../utils/lang';

/**
 * returns a 'is_present' validator based of fieldName
 *
 * @param {string} fieldName
 */
export const exists = (fieldName: string, where: 'body' | 'param') => {
  if (where === 'param') return param(fieldName, lang.fieldMissing(fieldName)).exists();
  return body(fieldName, lang.fieldMissing(fieldName)).exists();
};

/**
 * GLOBAL VALIDATORS UTILITIES
 */

export const BODY = {
  MISSING_EMAIL: exists('email', 'body'),
  MISSING_PASSWORD: exists('password', 'body'),
  MISSING_NAME: exists('name', 'body'),
};

export const PARAM = {
  MISSING_USERID: exists('userID', 'param'),
};

export const INVALID = {
  PASSWORD_LENGTH: body('password', lang.fieldLengthInvalid('password', 8))
                    .isString()
                    .isLength({ min: 8 })
                    .trim()
                    .escape(),
  EMAIL_IS_EMAIL: body('email', lang.fieldInvalid('email'))
                    .isEmail()
                    .normalizeEmail(),
  ID_NOT_MONGOID: param('userID', lang.fieldInvalid('userID'))
                    .isMongoId(),
};

export const VALID = {
  PASSWORD: [
    BODY.MISSING_PASSWORD,
    INVALID.PASSWORD_LENGTH,
  ],
  EMAIL: [
    BODY.MISSING_EMAIL,
    INVALID.EMAIL_IS_EMAIL,
  ],
  USERID: [
    PARAM.MISSING_USERID,
    INVALID.ID_NOT_MONGOID,
  ],
};
