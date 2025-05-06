import {pool} from '../../../db.js';

// Create a new business expense
export const createBusinessExpense = async (req, res) => {
    try {
        const { user_id, amount, date, category_id, description } = req.body;
        const query = `
            INSERT INTO expenses (user_id, amount, date, category_id, description, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
        `;
        const [result] = await db.query(query, [user_id, amount, date, category_id, description]);

        const expense_id = result.insertId;

        // Fetch the newly created expense to return in the response
        const [expenses] = await db.query('SELECT * FROM expenses WHERE expense_id = $1', [expense_id]);
        const newExpense = expenses[0];

        res.status(201).json(newExpense); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create expense' });
    }
};

// Get a specific business expense
export const getBusinessExpense = async (req, res) => {
    try {
        const expense_id = req.params.expense_id;
        const [expenses] = await db.query('SELECT * FROM expenses WHERE expense_id = $1', [expense_id]);

        if (expenses.length === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const expense = expenses[0];
        res.status(200).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve expense' });
    }
};

// Update a specific business expense
export const updateBusinessExpense = async (req, res) => {
    try {
        const expense_id = req.params.expense_id;
        const { amount, description } = req.body;
        const query = `
            UPDATE expenses
            SET amount = $1, description = $2
            WHERE expense_id = $3
        `;
        const [result] = await db.query(query, [amount, description, expense_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Fetch the updated expense to return
        const [expenses] = await db.query('SELECT * FROM expenses WHERE expense_id = $1', [expense_id]);
        const updatedExpense = expenses[0];
        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update expense' });
    }
};

// Delete a specific business expense
export const deleteBusinessExpense = async (req, res) => {
    try {
        const expense_id = req.params.expense_id;
        const [result] = await db.query('DELETE FROM expenses WHERE expense_id = $1', [expense_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete expense' });
    }
};

