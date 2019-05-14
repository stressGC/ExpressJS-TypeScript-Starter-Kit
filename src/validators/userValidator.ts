// tslint:disable: max-line-length
'use strict';

import { body, param, oneOf, ValidationChain } from 'express-validator/check';
import * as lang from './../utils/lang';

/* MISSING */
const MISSING_PASSWORD = body('password', lang.fieldMissing('password')).exists();
const MISSING_NAME = body('name', lang.fieldMissing('name')).exists();
const MISSING_EMAIL = body('email', lang.fieldMissing('email')).exists();
const MISSING_USERID = param('userID', lang.fieldMissing('userID')).exists();

/* INVALID */
const INVALID_PASSWORD_LENGTH = body('password', lang.fieldLengthInvalid('password', 8)).isString().isLength({ min: 8 });
const INVALID_EMAIL_IS_EMAIL = body('email', lang.fieldInvalid('email')).isEmail();
const INVALID_ID_NOT_MONGOID = param('userID', lang.fieldInvalid('userID')).isMongoId();

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
