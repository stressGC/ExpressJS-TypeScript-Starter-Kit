"use strict";
const express = require('express');
import initializeRoutes from './routes';
import * as morgan from './utils/logger/morgan';

/* instanciate app */
const app = express();

/* set options */
app.set("port", process.env.PORT || 3000);
app.set("env", process.env.NODE_ENV || "dev");

/* set loggers */
app.use(morgan.errorLogging);
app.use(morgan.successLogging);

/* initialize routes */
initializeRoutes(app);

export default app;