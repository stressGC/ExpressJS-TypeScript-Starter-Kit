"use strict";

import * as Boom from '@hapi/boom';
import {NOT_A_NUMBER} from '../utils/lang';
import { Request, Response, NextFunction } from 'express';
import errorHandler from './errorHandler';

/**
 * Validate the param is a Number
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const paramIsNumber = (req: Request, res: Response, next: NextFunction) => {
  const toTest: number = req.params.number;

  if(!isNaN(toTest)) return next();

  return errorHandler(res, Boom.badRequest(NOT_A_NUMBER));
}