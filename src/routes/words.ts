const wordsRouter = require('express').Router();
import { Request, Response } from "express";

wordsRouter.get('/', function(req: Request, res: Response, next: Function) {
  return res.status(200).send({ result: "some word" });
});

wordsRouter.get('/:word', function(req: Request, res: Response, next: Function) {
  const result : String = req.params.word;
  return res.status(200).send({ result });
});

module.exports = wordsRouter;