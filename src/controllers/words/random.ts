"use strict";
import { Request, Response } from "express";
import { OK } from 'http-status-codes';

/**
 * Returns a random sequence of char
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 */
const random = (_req: Request, res: Response): Response => {
  const result: string = "somewordidk";
  return res.status(OK).send({ result });
};

export default random;