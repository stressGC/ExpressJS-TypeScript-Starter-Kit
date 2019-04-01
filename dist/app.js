"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const initializeRoutes = require('./routes/');
const app = express();
app.set("port", process.env.PORT || 3000);
console.log(initializeRoutes);
initializeRoutes(app);
exports.default = app;
//# sourceMappingURL=app.js.map