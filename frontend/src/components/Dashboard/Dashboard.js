import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
const Dashboard = () => {
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>hi</h1>
      </InnerLayout>
    </DashboardStyled>
  );
};
const DashboardStyled = styled.div``;
export default Dashboard;
