"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const morgan = require("./utils/logger/morgan");
const helmet = require("helmet");
const cors_1 = require("./middlewares/cors");
const mongo_1 = require("./utils/mongo/");
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
mongo_1.default();
/* initialize middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors_1.default);
/* initialize API routes */
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map