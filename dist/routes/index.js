"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("../routes/numbers");
const words_1 = require("../routes/words");
const express = require("express");
const path = require("path");
exports.default = (app) => {
    /* expose public folder */
    app.use('/public', express.static(path.join(__dirname, '../../public')));
    /* use our subrouters */
    app.use('/numbers', numbers_1.default);
    app.use('/words', words_1.default);
};
//# sourceMappingURL=index.js.map