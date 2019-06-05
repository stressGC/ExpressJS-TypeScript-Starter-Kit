'use strict';

import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import User from './../models/User';
import IUserDocument from '../interfaces/IUserDocument';

/**
 * Fetches all users and return them as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const getAll = (req: Request, res: Response, next: NextFunction): void => {
  User
    .fetchAll()
    .then(result => res.status(OK).json(result))
    .catch(error => next(error));
};

/**
 * Fetches an User based on its ID, and returns it as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const getByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;

  User
    .fetchByID(userID)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

/**
 * Updates an User based on its ID, and returns the updated user as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const modifyByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;
  const modifications = req.body;

  User
    .modifyByID(userID, modifications)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

/**
 * Creates a new User, and returns it as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
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

/**
 * Deletes a User based on its ID, and returns the deleted user as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const deleteByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;

  User
    .deleteByID(userID)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};
