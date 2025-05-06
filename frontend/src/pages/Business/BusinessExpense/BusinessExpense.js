import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../../context/globalContext";
import { InnerLayout } from "../../../styles/Layouts";
// import Form from "../Form/Form";
import IncomeItem from "../IncomeItem";
import BusinessExpenseForm from "../BusinessExpense/ExpenseForm";
import { dollar } from "../../../utils/Icons";

function BusinessExpense() {
  const {
    businessExpenses,
    getBusinessExpenses,
    deleteBusinessExpense,
    totalBusinessExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getBusinessExpenses();
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: {dollar}
          {totalBusinessExpenses().toFixed(2)}
        </h2>

        <div className="income-content">
          <div className="form-container">
            <BusinessExpenseForm />
          </div>
          <div className="incomes">
            {businessExpenses.map((expense) => {
              const { id, title, amount, date, category, description, type } =
                expense;
              return (
                <IncomeItem
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteBusinessExpense}
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

export default BusinessExpense;
