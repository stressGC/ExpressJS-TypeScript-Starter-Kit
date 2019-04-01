"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("../routes/numbers");
exports.default = (app) => {
    app.use('/numbers', numbers_1.default);
};
//# sourceMappingURL=index.js.map