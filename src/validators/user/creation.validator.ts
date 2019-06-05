'use strict';

import { ValidationChain } from 'express-validator/check';
import { BODY, VALID } from '../index';

/**
 * validates user creation
 * @body name, email, password
 * @email is email
 * @password is valid
 */
const validateUser: ValidationChain[] = [
  BODY.MISSING_NAME,
  ...VALID.EMAIL,
  ...VALID.PASSWORD,
];

export default validateUser;
