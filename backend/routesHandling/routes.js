import { Router } from "express";
const router = Router();

import {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
} from "./controllers/personal/expense.js";
import {
  addIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} from "./controllers/personal/income.js";
import {
  registerUser,
  loginUser,
} from "./controllers/personal/authorization.js";

import {
  createBusinessExpense,
  getAllBusinessExpenses,
  getBusinessExpenseById,
  updateBusinessExpense,
  deleteBusinessExpense
} from "./controllers/business/expense.js";
import {
  createBusinessIncome,
  getAllBusinessIncomes,
  getBusinessIncomeById,
  updateBusinessIncome,
  deleteBusinessIncome
} from "./controllers/business/income.js";

//Personal Expense Routes
router.post("/expenses", addExpense);
router.get("/expenses", getAllExpenses);
router.get("/expenses/category", getExpensesByCategory);
router.get("/expenses/:id", getExpenseById);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

//Personal Income Routes
router.post("/incomes", addIncome);
router.get("/incomes", getIncomes);
router.get("/incomes/:id", getIncomeById);
router.put("/incomes/:id", updateIncome);
router.delete("/incomes/:id", deleteIncome);

// Business Expense Routes
router.post("/business/expenses", createBusinessExpense);
router.get("/business/expenses", getAllBusinessExpenses);
router.get("/business/expenses/:expense_id", getBusinessExpenseById);
router.put("/business/expenses/:expense_id", updateBusinessExpense);
router.delete("/business/expenses/:expense_id", deleteBusinessExpense);

// Business Income Routes
router.post("/business/incomes", createBusinessIncome);
router.get("/business/incomes", getAllBusinessIncomes);
router.get("/business/incomes/:income_id", getBusinessIncomeById);
router.put("/business/incomes/:income_id", updateBusinessIncome);
router.delete("/business/incomes/:income_id", deleteBusinessIncome);

// Authentication Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

export default router;
