import { oneOf } from 'express-validator/check';
import { BODY, VALID, INVALID } from '../index';
import * as lang from '../../utils/lang';

/**
 * validates a user modification
 * @param userID
 * @body oneOf(name, password, email)
 * @userID is valid MongoID
 * @name is present
 * @password is valid
 * @email is email
 */
const validateModificationBody = [
  ...VALID.USERID,
  oneOf([
    BODY.MISSING_NAME,
    BODY.MISSING_PASSWORD,
    INVALID.EMAIL_IS_EMAIL,
  ],    lang.EMPTY_BODY),
];

export default validateModificationBody;
