'use strict';

export const NOT_A_NUMBER = 'The provided parameter is not a number';
export const NOT_A_CORRECT_USER = 'Incorrect user provided';
export const USERID_NOT_VALID = '"userID" is not a valid ID';

export const RESSOURCE_NOT_FOUND = 'The requested ressource was not found';
export const EMAIL_ALREADY_TAKEN = '"Email" is already taken';
export const EMPTY_BODY = 'The provided body is empty';

export const fieldMissing = (fieldName: string): string => `"${fieldName}" is missing`;
export const fieldInvalid = (fieldName: string): string => `"${fieldName}" has an invalid value`;
export const fieldLengthInvalid = (fieldName: string, min: number, max?: number): string => {
  const maxPart = max ? `and at most ${max} characters long` : '';
  return `"${fieldName}" must be at least ${min} characters long ${maxPart}`;
};
