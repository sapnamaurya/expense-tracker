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

//creating a new expense
app.post('/api/expenses', async (req, res) => {
  const { user_id, category_id, amount, description, expense_date } = req.body;
  try {
    const result = await pool.query('INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, category_id, amount, description, expense_date]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create expense note' });
  }
});

//getting all expenses for a specific user
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses where user_id = $1', [req.query.user_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expense notes' });
  }
});

//getting all expenses for a specific user and category
app.get('/api/expenses/category', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses where user_id = $1 and category_id = $2', [req.query.user_id, req.query.category_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expense notes' });
  }
});

//getting all expenses for a specific user and date range
app.get('/api/expenses/date', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses where user_id = $1 and expense_date BETWEEN $2 and $3', [req.query.user_id, req.query.start_date, req.query.end_date]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expense notes' });
  }
});

// //getting all expenses for a specific user and category and date range
// app.get('/api/expenses/category/date', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM expenses where user_id = $1 and category_id = $2 and expense_date BETWEEN $3 and $4', [req.query.user_id, req.query.category_id, req.query.start_date, req.query.end_date]);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch expense notes' });
//   }
// });

//get a specific expense by its ID
app.get('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM expenses WHERE expense_id = $1', [id]);
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
        return res.status(400).json({ error: 'Invalid expense ID' });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense note not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expense note' });
  }
});

//update an existing expense
app.put('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, category_id, amount, description, expense_date } = req.body;
  try {
    const result = await pool.query('UPDATE expenses SET user_id = $1, category_id = $2, amount = $3, description = $4, expense_date = $5 WHERE expense_id = $6 RETURNING *', [user_id, category_id, amount, description, expense_date, id]);
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
        return res.status(400).json({ error: 'Invalid expense ID' });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense note not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update expense note' });
  }
});

//delete an existing expense
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const checkResult = await pool.query('SELECT * FROM expenses WHERE expense_id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Expense note not found' });
    }
    
    const result = await pool.query('DELETE FROM expenses WHERE expense_id = $1 RETURNING *', [id]);
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete expense note' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});