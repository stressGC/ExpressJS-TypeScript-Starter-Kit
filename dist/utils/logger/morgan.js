"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require('morgan');
require('dotenv').config();
const morganLogType = (process.env.NODE_ENV === "production") ? "common" : "dev";
exports.errorLogging = morgan(morganLogType, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
});
exports.successLogging = morgan(morganLogType, {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
});
//# sourceMappingURL=morgan.js.map