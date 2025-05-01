import { Router } from 'express';
const router = Router();

import{ 
    addExpense, 
    getAllExpenses, 
    getExpenseById, 
    updateExpense, 
    deleteExpense, 
    getExpensesByCategory, 
} from './controllers/expense.js';
import{ 
    addIncome, 
    getIncomes, 
    getIncomeById, 
    updateIncome, 
    deleteIncome 
} from './controllers/income.js';
import { registerUser, loginUser } from './controllers/authorization.js';

//Expense Routes
router.post('/expenses', addExpense);
router.get('/expenses', getAllExpenses);
router.get('/expenses/category', getExpensesByCategory); 
router.get('/expenses/:id', getExpenseById); 
router.put('/expenses/:id', updateExpense); 
router.delete('/expenses/:id', deleteExpense);

// Income Routes
router.post('/incomes', addIncome);
router.get('/incomes', getIncomes);
router.get('/incomes/:id', getIncomeById); 
router.put('/incomes/:id', updateIncome); 
router.delete('/incomes/:id', deleteIncome);

// Authentication Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

export default router;