import "dotenv/config.js";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";

import db from './config/db';
import loadRoutes from "./routes/index";

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());

loadRoutes(app);

app.serverInstance = app.listen(port, () => {
  console.log(`R&M Server up and running on port ${port}`);
});

export default app;