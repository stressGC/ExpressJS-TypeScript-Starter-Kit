"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routes_1 = require("./routes");
const app = express();
app.set("port", process.env.PORT || 3000);
console.log(routes_1.default);
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map