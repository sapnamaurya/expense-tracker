import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  // Personal
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Business
  const [businessIncomes, setBusinessIncomes] = useState([]);
  const [businessExpenses, setBusinessExpenses] = useState([]);

  const [error, setError] = useState(null);

  // --- PERSONAL INCOME ---
  const getIncomes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/incomes`);
      setIncomes(res.data);
    } catch (err) {
      setError("Failed to fetch personal incomes");
    }
  };

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}/incomes`, income);
      getIncomes();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add personal income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/incomes/${id}`);
      getIncomes();
    } catch (err) {
      setError("Failed to delete personal income");
    }
  };

  // --- PERSONAL EXPENSE ---
  const getExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/expenses`);
      setExpenses(res.data);
    } catch (err) {
      setError("Failed to fetch personal expenses");
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}/expenses`, expense);
      getExpenses();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to add personal expense"
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      getExpenses();
    } catch (err) {
      setError("Failed to delete personal expense");
    }
  };

  const updateExpense = async (id) => {
    try {
      await axios.put(`${BASE_URL}/expenses/${id}`);
      getExpenses();
    } catch (err) {
      setError("Failed to delete personal expense");
    }
  };

  // --- BUSINESS INCOME ---
  const getBusinessIncomes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/business/incomes`);
      setBusinessIncomes(res.data);
    } catch (err) {
      setError("Failed to fetch business incomes");
    }
  };

  const addBusinessIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}/business/incomes`, income);
      getBusinessIncomes();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add business income");
    }
  };

  const deleteBusinessIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/business/incomes/${id}`);
      getBusinessIncomes();
    } catch (err) {
      setError("Failed to delete business income");
    }
  };

  // --- BUSINESS EXPENSE ---
  const getBusinessExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/business/expenses`);
      setBusinessExpenses(res.data);
    } catch (err) {
      setError("Failed to fetch business expenses");
    }
  };

  const addBusinessExpense = async (expense) => {
    try {
      await axios.post("/api/business/expenses", expense); // Temporary: Replace with actual logged-in user ID if available);
      // update state accordingly...
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  const deleteBusinessExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/business/expenses/${id}`);
      getBusinessExpenses();
    } catch (err) {
      setError("Failed to delete business expense");
    }
  };
  // PERSONAL EXPENSE - EDIT
  const editExpense = async (id, updatedExpense) => {
    try {
      await axios.put(`${BASE_URL}/expenses/${id}`, updatedExpense);
      getExpenses();
    } catch (err) {
      setError("Failed to update personal expense");
    }
  };

  // BUSINESS EXPENSE - EDIT
  const editBusinessExpense = async (id, updatedExpense) => {
    try {
      await axios.put(`${BASE_URL}/business/expenses/${id}`, updatedExpense);
      getBusinessExpenses();
    } catch (err) {
      setError("Failed to update business expense");
    }
  };

  // --- CALCULATIONS ---
  const totalIncome = () =>
    incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalExpenses = () =>
    expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalBalance = () => totalIncome() - totalExpenses();

  const totalBusinessIncome = () =>
    businessIncomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalBusinessExpenses = () =>
    businessExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalBusinessBalance = () =>
    totalBusinessIncome() - totalBusinessExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  const businessTransactionHistory = () => {
    const history = [...businessIncomes, ...businessExpenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  // --- FETCH INITIAL DATA ---
  useEffect(() => {
    getIncomes();
    getExpenses();
    getBusinessIncomes();
    getBusinessExpenses();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        // Personal
        incomes,
        addIncome,
        deleteIncome,
        getIncomes,
        expenses,
        addExpense,
        deleteExpense,
        editExpense,
        getExpenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,

        // Business
        businessIncomes,
        addBusinessIncome,
        deleteBusinessIncome,
        getBusinessIncomes,
        businessExpenses,
        addBusinessExpense,
        deleteBusinessExpense,
        getBusinessExpenses,
        totalBusinessIncome,
        totalBusinessExpenses,
        totalBusinessBalance,
        businessTransactionHistory,

        // Common

        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
