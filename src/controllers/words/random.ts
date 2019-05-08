"use strict";
import { Request, Response } from "express";

/**
 * Returns a random sequence of char
 *
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 */
const random = (_req: Request, res: Response): Response => {
  const result: string = "somewordidk";
  return res.status(200).send({ result });
};

export default random;