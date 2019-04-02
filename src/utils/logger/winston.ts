"use strict";
const winston = require('winston');
import * as path  from 'path';
import { Logger, format } from 'winston';
require('dotenv').config();

const level = process.env.LOG_LEVEL || 'debug';
const logFile = process.env.LOG_FILE || 'winston.log';
const logFilePath = path.join(__dirname, '../../../logs/', logFile);

const logger: Logger = winston.createLogger({
    format: format.combine( 
        format.timestamp(),
        format.json(),
    ),
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

export default logger;