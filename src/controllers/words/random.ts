"use strict";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const result: string = "somewordidk";
  return res.status(200).send({ result });
}