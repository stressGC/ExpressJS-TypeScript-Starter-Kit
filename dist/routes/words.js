"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wordsRouter = require('express').Router();
wordsRouter.get('/', function (req, res, next) {
    return res.status(200).send({ result: "some word" });
});
wordsRouter.get('/:word', function (req, res, next) {
    const result = req.params.word;
    return res.status(200).send({ result });
});
module.exports = wordsRouter;
//# sourceMappingURL=words.js.map