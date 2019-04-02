"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbersRouter = require('express').Router();
const words_1 = require("../controllers/words");
const { echo, random } = words_1.default;
numbersRouter.get('/:word', echo);
numbersRouter.get('/', random);
exports.default = numbersRouter;
//# sourceMappingURL=words.js.map