import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";
import { dollar } from "../../utils/Icons";

function Expenses() {
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();
  const [editExpense, setEditExpense] = useState(null);

  const handleEdit = (id) => {
    const toEdit = expenses.find((item) => item.expense_id === id);
    console.log(toEdit);
    setEditExpense(toEdit);
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: {dollar}
          {totalExpenses().toFixed(2)}
        </h2>

        <div className="income-content">
          <div className="form-container">
            <ExpenseForm expense={editExpense} />
          </div>
          <div className="incomes">
            {expenses.map((income) => {
              const {
                expense_id,
                title,
                amount,
                date,
                category,
                description,
                type,
              } = income;

              return (
                <IncomeItem
                  key={expense_id}
                  id={expense_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                  handleEdit={handleEdit} // ✅ added
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
      height: 59vh;
      overflow: auto;
    }
  }
`;

export default Expenses;
