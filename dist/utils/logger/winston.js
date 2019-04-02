"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
const path = require("path");
const winston_1 = require("winston");
require('dotenv').config();
const level = process.env.LOG_LEVEL || 'debug';
const logFile = process.env.LOG_FILE || 'winston.log';
const logFilePath = path.join(__dirname, '../../../logs/', logFile);
const logger = winston.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston.transports.Console({
            level,
            colorize: true,
        }),
        new winston.transports.File({
            level,
            filename: logFilePath,
        })
    ],
});
logger.debug("App started");
exports.default = logger;
//# sourceMappingURL=winston.js.map