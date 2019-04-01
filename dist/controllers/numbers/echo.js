"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const result = req.params.number;
    return res.status(200).send({ result });
};
//# sourceMappingURL=echo.js.map