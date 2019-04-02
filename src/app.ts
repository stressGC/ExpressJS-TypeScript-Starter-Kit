"use strict";
import * as express from 'express';
import initializeRoutes from './routes';
import * as morgan from './utils/logger/morgan';
import * as helmet from 'helmet';
import cors from './middlewares/cors';
import initMongo from './utils/mongo/';
require('dotenv').config();

/* instanciate app */
const app = express();

/* set options */
app.set("port", process.env.PORT || 3000);
app.set("env", process.env.NODE_ENV || "dev");

/* set loggers */
app.use(morgan.errorLogging);
app.use(morgan.successLogging);

/* initialize MongoDB connection */
initMongo();

/* initialize middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors);

/* initialize API routes */
initializeRoutes(app);

export default app;