import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";

const Expenses = () => {
  return (
    <div>
      <ExpensesStyled>
        <InnerLayout></InnerLayout>
      </ExpensesStyled>
    </div>
  );
};
const ExpensesStyled = styled.div``;
export default Expenses;
