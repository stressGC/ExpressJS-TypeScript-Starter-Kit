"use strict";
import { Request, Response } from "express";

/**
 * Echoes the provided word
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 
 */
const echo = (req: Request, res: Response): Response => {
  const result: string = req.params.word;
  return res.status(200).send({ result });
;}

export default echo;