import express from "express";
import { Pool } from "pg";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

//creating a new expense
app.post('/api/expenses', async (req, res) => {
  const { name, amount, date } = req.body;
  try {
    const result = await pool.query('INSERT INTO expenses (name, amount, date) VALUES ($1, $2, $3) RETURNING *', [name, amount, date]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create expense note' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});