"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
require('dotenv').config();
const level = process.env.LOG_LEVEL || 'debug';
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level,
            timestamp: () => new Date().toISOString(),
        }),
        new winston.transports.File({
            level,
            timestamp: () => new Date().toISOString(),
            filename: "../../../logs/winston.logs",
        })
    ],
});
exports.default = logger;
//# sourceMappingURL=winston.js.map