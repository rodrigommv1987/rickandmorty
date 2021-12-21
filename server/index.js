import "dotenv/config.js";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";

import db from "./config/db";
import loadRoutes from "./routes/index";
import { delayNetworkRequest } from "./middleware/delayNetworkRequest";

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(delayNetworkRequest);

loadRoutes(app);

app.serverInstance = app.listen(port, () => {
  console.log(`R&M Server up and running on port ${port}`);
});

export default app;
