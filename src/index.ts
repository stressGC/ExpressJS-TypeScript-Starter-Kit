"use strict";

import app from './app';

const server = app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env"),
    "\nPress CTRL-C to stop"
  );
});

export default server;