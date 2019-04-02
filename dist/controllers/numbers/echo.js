"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("../../utils/logger/winston");
exports.default = (req, res, next) => {
    const result = req.params.number;
    winston_1.default.debug(`number is ${result}`);
    return res.status(200).send({ result });
};
//# sourceMappingURL=echo.js.map