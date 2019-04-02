"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("App is running on http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"), "\nPress CTRL-C to stop");
});
exports.default = server;
//# sourceMappingURL=index.js.map