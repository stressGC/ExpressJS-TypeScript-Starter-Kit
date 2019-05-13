'use strict';

import { validateUser } from './userValidator';
import winston from '../utils/logger/winston';
import validationErrorHandler from './validationErrorHandler';
import { USER } from './../utils/constants';

const getValidatorFunction = (identifier: string) => {
  switch (identifier) {
    case USER.VALIDATION:
      return validateUser;
    default:
      winston.error(`No validator found with identifier {${identifier}}`);
      break;
  }
};

const get = (identifier: string) => [...getValidatorFunction(identifier), validationErrorHandler];

export default {
  get,
};
