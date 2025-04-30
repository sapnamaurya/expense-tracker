import express from "express";
import {connectDb} from "./db.js";
import bodyParser from "body-parser";
import router from "./routesHandling/routes.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
import cors from "cors"; // add this import

app.use(cors()); // add this middleware

connectDb();

app.get("/", (req, res) => {
  res.send("Hello World!");       
});

app.use('/api/transactions', router);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
