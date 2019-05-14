// tslint:disable: max-line-length
'use strict';

import { validateUser, validateUserID, validateModificationBody } from './userValidator';
import winston from '../utils/logger/winston';
import validationErrorHandler from './validationErrorHandler';
import { USER } from '../utils/constants';
import * as lang from '../utils/lang';
import { body } from 'express-validator/check';

const getValidatorFunction = (identifier: string) => {
  switch (identifier) {
    case USER.VALIDATION:
      return validateUser;
    case USER.IS_ID_CORRECT:
      return validateUserID;
    case USER.MODIFICATION:
      return validateModificationBody;
    default:
      winston.error(`No validator found with identifier {${identifier}}`);
      break;
  }
};

const get = (identifier: string) => [...getValidatorFunction(identifier), validationErrorHandler];

export default {
  get,
};
