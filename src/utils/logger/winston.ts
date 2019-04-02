"use strict";
const winston = require('winston');
import { Logger } from 'winston';
require('dotenv').config();

const level = process.env.LOG_LEVEL || 'debug';

const logger: Logger = winston.createLogger({
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

export default logger;