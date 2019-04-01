const express = require('express');
import initializeRoutes from './routes';

const app = express();
app.set("port", process.env.PORT || 3000);
console.log(initializeRoutes)
initializeRoutes(app);

export default app;