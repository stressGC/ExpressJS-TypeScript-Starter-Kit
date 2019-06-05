import validationErrorHandler from './validationErrorHandler';
import { USER, AUTH } from '../utils/constants';
import auth from './auth';
import user from './user';
import winston = require('winston');
import { VALID } from './index';

/**
 * Get a validator middlewares chain based on its identifier
 *
 * @param {string} identifier
 * @returns Middleware chain
 */
const getValidatorFunctions = (identifier: string) => {
  switch (identifier) {
    case USER.VALIDATION:
      return user.creation;
    case USER.IS_ID_CORRECT:
      return VALID.USERID;
    case USER.MODIFICATION:
      return user.modification;
    case AUTH.LOGIN:
      return auth.login;
    default:
      winston.error(`No validator found with identifier {${identifier}}`);
      break;
  }
};

/**
 * Merges the validator chain and the validation error handler based on the identifier
 *
 * @param {string} identifier
 */
export const get = (identifier: string) => [
  ...getValidatorFunctions(identifier),
  validationErrorHandler,
];
