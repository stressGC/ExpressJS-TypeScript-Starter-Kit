'use strict';

import { body, param, oneOf } from 'express-validator/check';

export const validateUser = [
  body('name', '"Name" field is missing').exists().isString(),
  body('email', '"Email" field is missing').exists(),
  body('email', 'Invalid email').isEmail(),
  body('password', '"Password" field is missing').exists().isString(),
  body('password', '"Password" must be at least 8 characters long').isString().isLength({ min: 8 }),
];

export const validateUserID = [
  param('userID', '"userID" is missing').exists(),
  param('userID', '"userID" is not a valid ID').isMongoId(),
];

export const validateModificationBody = [
  param('userID', '"userID" is missing').exists(),
  param('userID', '"userID" is not a valid ID').isMongoId(),
  oneOf([
    body('name').isString(),
    body('password', '"Password" must be at least 8 characters long').isLength({ min: 8 }),
    body('email', 'Invalid email').isEmail(),
  ],    'Empty body provided'),
];

export default validateUser;
