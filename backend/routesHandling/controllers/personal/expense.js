import { pool } from "../../../db.js";

export const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const query = `
      INSERT INTO expenses (title, amount, category, description, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [title, amount, category, description, date];
    const result = await pool.query(query, values);

    res.status(200).json({ message: "Expense Added", expense: result.rows[0] });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const query = `
      SELECT * FROM expenses;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  console.log("req.params:", req.params);
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM expenses
      WHERE expense_id = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Expense Deleted" });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenseById = async (req, res) => {
  console.log("req.params:", req.params);
  const { id } = req.params;

  try {
    const query = `
      SELECT * FROM expenses
      WHERE expense_id  = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(title);
    }
    if (amount !== undefined) {
      fields.push(`amount = $${paramIndex++}`);
      values.push(amount);
    }
    if (category !== undefined) {
      fields.push(`category = $${paramIndex++}`);
      values.push(category);
    }
    if (description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (date !== undefined) {
      fields.push(`date = $${paramIndex++}`);
      values.push(date);
    }

    // Ensure at least one field is being updated
    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided for update." });
    }

    values.push(id); // Add id as the last parameter

    const query = `
      UPDATE expenses
      SET ${fields.join(", ")}
      WHERE expense_id = $${paramIndex}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpensesByCategory = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: "Category are required!" });
  }

  try {
    const query = `
      SELECT * FROM expenses
      WHERE category= $1;
    `;
    const values = [category];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
