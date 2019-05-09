"use strict";
import { Request, Response } from "express";
import { OK } from 'http-status-codes';

/**
 * Echoes the provided word
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 
 */
const echo = (req: Request, res: Response): Response => {
  const result: string = req.params.word;
  return res.status(OK).send({ result });
;}

export default echo;