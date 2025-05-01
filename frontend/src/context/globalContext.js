import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/transactions/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // //calculate incomes
  // const addIncome = async (income) => {
  //   const response = await axios
  //     .post(`${BASE_URL}add-income`, income)
  //     .catch((err) => {
  //       setError(err.response.data.message);
  //     });
  //   getIncomes();
  // };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}incomes`);
      setIncomes(response.data);
    } catch (err) {
      setError("Failed to fetch incomes");
      console.error(err);
    }
  };

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}incomes`, income);
      getIncomes();
    } catch (err) {
      setError(err?.response?.data?.message || "Add income failed");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}incomes/${id}`);
      getIncomes();
    } catch (err) {
      setError("Failed to delete income");
    }
  };
  // Add a new expense
  const addExpense = async (expenseData) => {
    try {
      await axios.post(`${BASE_URL}expenses`, expenseData);
      getExpenses(); // Refresh the list after adding
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add expense");
    }
  };

  // Fetch all expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}expenses`);
      setExpenses(response.data);
    } catch (err) {
      setError("Failed to fetch expenses");
      console.error(err);
    }
  };

  // Delete an expense by ID
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}expenses/${id}`);
      getExpenses(); // Refresh the list after deletion
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += Number(income.amount);
    });

    return totalIncome;
  };

  const totalExpenses = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += Number(expense.amount); // Force amount to be a number
    });
    return total;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
