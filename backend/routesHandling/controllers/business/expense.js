import { pool } from "../../../db.js";

export const createBusinessExpense = async (req, res) => {
  try {
    const { user_id, amount, date, description } = req.body;

    // Basic validation
    if (!user_id || !amount || !date) {
      return res
        .status(400)
        .json({ message: "user_id, amount, and date are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO businessExpenses (user_id, amount, date, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, amount, date, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create business expense" });
  }
};

export const getAllBusinessExpenses = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM businessExpenses");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve business expenses" });
  }
};

export const getBusinessExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM businessExpenses WHERE expense_id = $1",
      [expenseId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Business expense not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve business expense" });
  }
};

export const updateBusinessExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { user_id, amount, date, description } = req.body;

    // Basic validation
    if (!user_id || !amount || !date) {
      return res
        .status(400)
        .json({ message: "user_id, amount, and date are required" });
    }

    const [result] = await pool.query(
      "UPDATE businessExpenses SET user_id = $1, amount = $2, date = $3, description = $4 WHERE expense_id = $5 RETURNING *",
      [user_id, amount, date, description, expenseId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Business expense not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update business expense" });
  }
};

export const deleteBusinessExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const [result] = await pool.query(
      "DELETE FROM businessExpenses WHERE expense_id = $1 RETURNING *",
      [expenseId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Business expense not found" });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete business expense" });
  }
};
