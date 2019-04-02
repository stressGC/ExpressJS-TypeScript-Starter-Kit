"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("../routes/numbers");
const words_1 = require("../routes/words");
exports.default = (app) => {
    app.use('/numbers', numbers_1.default);
    app.use('/words', words_1.default);
};
//# sourceMappingURL=index.js.map