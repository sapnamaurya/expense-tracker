import { pool } from '../../db.js'; 

export const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const query = `
      INSERT INTO incomes (title, amount, category, description, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [title, amount, category, description, date];
    const result = await pool.query(query, values);

    res.status(200).json({ message: 'Income Added', income: result.rows[0] });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const query = `
      SELECT * FROM incomes
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = `
        DELETE FROM incomes
        WHERE id = $1;
      `;
      const values = [id];
      const result = await pool.query(query, values);
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Income Deleted' });
      } else {
        res.status(404).json({ message: 'Income not found' });
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      res.status(500).json({ message: 'Server Error' });
    }
};

export const getIncomeById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT * FROM incomes
      WHERE id = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { user_id, category_id, amount, description, income_date } = req.body;

  try {
    const query = `
      UPDATE incomes
      SET user_id = $1, category_id = $2, amount = $3, description = $4, date = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [user_id, category_id, amount, description, income_date, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};