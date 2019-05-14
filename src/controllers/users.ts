'use strict';

import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import User from './../models/User';
import IUserDocument from '../interfaces/IUserDocument';

/**
 * Utility function that returns an Number between 0 & 500
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Number} random Number between 0 & 500
 */
export const getAll = (req: Request, res: Response, next: NextFunction): void => {
  User
    .fetchAll()
    .then(result => res.status(OK).json(result))
    .catch(error => next(error));
};

export const getByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;

  User
    .fetchByID(userID)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

export const modifyByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;
  const modifications = req.body;

  User
    .modifyByID(userID, modifications)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

export const create = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;

  const newUser = {
    name,
    email,
    password,
  };

  User
    .insertOne(newUser)
    .then(result => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

export const deleteByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;

  User
    .deleteByID(userID)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};
