"use strict";
const morgan = require('morgan');
import { Response, Request } from 'express';
require('dotenv').config();

const morganLogType: string = (process.env.NODE_ENV === "production") ? "common" : "dev";

export const errorLogging = morgan(morganLogType, {
    skip: (req: Request, res: Response) => res.statusCode < 400,
    stream: process.stderr,
}); 

export const successLogging = morgan(morganLogType, {
    skip: (req: Request, res: Response) => res.statusCode >= 400,
    stream: process.stdout,
});