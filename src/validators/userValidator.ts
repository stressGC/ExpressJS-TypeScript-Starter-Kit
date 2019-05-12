'use strict';

import { body } from 'express-validator/check';

/**
 * Validate the param is a Number
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const validateUser = [
  body('name', '"Name" field is missing').exists().isString(),
  body('email', '"Email" field is missing').exists(),
  body('email', 'Invalid email').isEmail(),
  body('password', '"Password" field is missing').exists().isString(),
  body('password', '"Password" must be at least 8 characters long').isLength({ min: 8 }),
];

export default validateUser;
