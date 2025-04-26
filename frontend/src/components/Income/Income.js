import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";

const Income = () => {
  return (
    <IncomeStyled>
      <InnerLayout>
        {" "}
        <h1>Incomes</h1>
        <h2 className="total-income">
          {/* Total Income: <span>${totalIncome()}</span> */}
        </h2>
        <div className="income-content">
          <div className="form-container">{/* <Form /> */}</div>
          {/* <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div> */}
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
};
const IncomeStyled = styled.div``;
export default Income;
