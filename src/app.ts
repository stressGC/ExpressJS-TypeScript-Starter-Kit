const express = require('express');
const initializeRoutes = require('./routes/');

const app = express();
app.set("port", process.env.PORT || 3000);
console.log(initializeRoutes)
initializeRoutes(app);

export default app;