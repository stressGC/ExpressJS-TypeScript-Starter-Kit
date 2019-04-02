"use strict";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const result: string = req.params.word;
  return res.status(200).send({ result });
}