import express from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const pool= new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, 
});

pool.connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});