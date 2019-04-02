"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routes_1 = require("./routes");
const morgan = require("./utils/logger/morgan");
/* instanciate app */
const app = express();
/* set options */
app.set("port", process.env.PORT || 3000);
app.set("env", process.env.NODE_ENV || "dev");
/* set loggers */
app.use(morgan.errorLogging);
app.use(morgan.successLogging);
/* initialize routes */
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map