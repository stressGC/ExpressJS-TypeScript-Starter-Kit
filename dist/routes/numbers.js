"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbersRouter = require('express').Router();
const numbers_1 = require("../controllers/numbers");
const { echo, random } = numbers_1.default;
numbersRouter.get('/:number', echo);
numbersRouter.get('/', random);
exports.default = numbersRouter;
//# sourceMappingURL=numbers.js.map