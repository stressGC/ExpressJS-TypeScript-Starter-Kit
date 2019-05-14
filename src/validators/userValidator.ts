// tslint:disable: max-line-length import-name
'use strict';

import { body, param, oneOf, ValidationChain } from 'express-validator/check';
import * as lang from './../utils/lang';

/**
 * returns a 'is_present' validator based of fieldName
 *
 * @param {string} fieldName
 */
export const exists = (fieldName: string, where: 'body' | 'param') => {
  if (where === 'param') {
    return param(fieldName, lang.fieldMissing(fieldName)).exists().not().isEmpty();
  }
  return body(fieldName, lang.fieldMissing(fieldName)).exists().not().isEmpty();
};

/* MISSING */
const MISSING_PASSWORD = exists('password', 'body');
const MISSING_NAME = exists('name', 'body');
const MISSING_EMAIL = exists('email', 'body');
const MISSING_USERID = exists('userID', 'param');

/* INVALID */
const INVALID_PASSWORD_LENGTH = body('password', lang.fieldLengthInvalid('password', 8))
                                  .isString()
                                  .isLength({ min: 8 })
                                  .trim()
                                  .escape();
const INVALID_EMAIL_IS_EMAIL =  body('email', lang.fieldInvalid('email'))
                                  .isEmail()
                                  .normalizeEmail();
const INVALID_ID_NOT_MONGOID = param('userID', lang.fieldInvalid('userID'))
                                  .isMongoId();

/**
 * password field is valid
 * @password present
 * @password length > 8
 */
const PASSWORD_VALIDATION = [
  MISSING_PASSWORD,
  INVALID_PASSWORD_LENGTH,
];

/**
 * email field is valid
 * @email present
 * @email is valid email
 */
const EMAIL_VALIDATION = [
  MISSING_EMAIL,
  INVALID_EMAIL_IS_EMAIL,
];

/**
 * userID field is valid
 * @userID is present
 * @userID is valid MongoID
 */
const USERID_VALIDATION = [
  MISSING_USERID,
  INVALID_ID_NOT_MONGOID,
];

/**
 * validates user creation
 * @body name, email, password
 * @email is email
 * @password is valid
 */
export const validateUser: ValidationChain[] = [
  MISSING_NAME,
  ...EMAIL_VALIDATION,
  ...PASSWORD_VALIDATION,
];

/**
 * validates a userID
 * @param userID
 * @userID is valid MongoID
 */
export const validateUserID: ValidationChain[] = [
  ...USERID_VALIDATION,
];

/**
 * validates a user modification
 * @param userID
 * @body oneOf(name, password, email)
 * @userID is valid MongoID
 * @name is present
 * @password is valid
 * @email is email
 */
export const validateModificationBody = [
  ...USERID_VALIDATION,
  oneOf([
    MISSING_NAME,
    MISSING_PASSWORD,
    INVALID_EMAIL_IS_EMAIL,
  ],    lang.EMPTY_BODY),
];
