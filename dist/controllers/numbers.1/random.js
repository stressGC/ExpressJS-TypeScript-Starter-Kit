"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const result = Math.random() * 50000;
    return res.status(200).send({ result });
};
//# sourceMappingURL=random.js.map