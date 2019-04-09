"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Number_1 = require("../../models/Number");
const winston_1 = require("../../utils/logger/winston");
exports.default = (req, res, next) => {
    const result = req.params.number;
    console.log(Number_1.default.getRandom(0, 12));
    winston_1.default.error(`number is ${result}`);
    return res.status(200).send({ result });
};
//# sourceMappingURL=echo.js.map