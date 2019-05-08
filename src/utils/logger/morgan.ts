"use strict";

const morgan = require('morgan');
import { Response, Request } from 'express';
require('dotenv').config();

const morganLogType: string = (process.env.NODE_ENV === "production") ? "common" : "dev";

/**
 * logs all requests with status code > 400 [ERRORS] 
 */
export const errorLogging = morgan(morganLogType, {
    skip: (_req: Request, res: Response) => res.statusCode < 400,
    stream: process.stderr,
});

/**
 * logs all requests with status code < 400 [SUCCESS] 
 */
export const successLogging = morgan(morganLogType, {
    skip: (_req: Request, res: Response) => res.statusCode >= 400,
    stream: process.stdout,
});