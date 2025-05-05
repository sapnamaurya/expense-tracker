import db from '../../../db.js';

// Create a new business income entry
const createIncome = async (req, res) => {
    try {
        const { title, amount, category, description, date, category_id } = req.body; 
        const query = `
            INSERT INTO income (title, amount, category, description, date, created_at, updated_at, category_id) 
            VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)
        `;
        const [result] = await db.query(query, [title, amount, category, description, date, category_id]); 

        const income_id = result.insertId;

        // Fetch the newly created income to return in the response
        const [incomes] = await db.query('SELECT * FROM income WHERE id = ?', [income_id]);
        const newIncome = incomes[0];

        res.status(201).json(newIncome); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create income' });
    }
};

// Get a specific business income entry
const getIncome = async (req, res) => {
    try {
        const income_id = req.params.income_id;
        const [incomes] = await db.query('SELECT * FROM income WHERE id = ?', [income_id]);

        if (incomes.length === 0) {
            return res.status(404).json({ message: 'Income not found' });
        }

        const income = incomes[0];
        res.status(200).json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve income' });
    }
};

// Update a specific business income entry
const updateIncome = async (req, res) => {
    try {
        const income_id = req.params.income_id;
        const { title, amount, category, description, date, category_id } = req.body; 
        const query = `
            UPDATE income
            SET title = ?, amount = ?, category = ?, description = ?, date = ?, updated_at = NOW(), category_id = ? 
            WHERE id = ?
        `;
        const [result] = await db.query(query, [title, amount, category, description, date, category_id, income_id]); 

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Fetch the updated income to return
        const [incomes] = await db.query('SELECT * FROM income WHERE id = ?', [income_id]);
        const updatedIncome = incomes[0];
        res.status(200).json(updatedIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update income' });
    }
};

// Delete a specific business income entry
const deleteIncome = async (req, res) => {
    try {
        const income_id = req.params.income_id;
        const [result] = await db.query('DELETE FROM income WHERE id = ?', [income_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete income' });
    }
};

module.exports = {
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome,
};
