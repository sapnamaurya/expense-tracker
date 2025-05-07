import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../../components/Chart/Chart";

function BusinessDashboard() {
  const {
    getBusinessIncomes,
    getBusinessExpenses,
    businessIncomes,
    businessExpenses,
    totalBusinessIncome,
    totalBusinessExpenses,
    totalBusinessBalance,
  } = useGlobalContext();

  useEffect(() => {
    getBusinessIncomes();
    getBusinessExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>Business Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart data={businessIncomes} expenses={businessExpenses} />
            <div className="amount-con">
              <div className="income">
                <h2>Total Business Income</h2>
                <p>
                  {dollar} {totalBusinessIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Business Expense</h2>
                <p>
                  {dollar} {totalBusinessExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Business Balance</h2>
                <p>
                  {dollar} {totalBusinessBalance()}
                </p>
              </div>
            </div>
          </div>

          <div className="history-con">
            <History data={businessIncomes.concat(businessExpenses)} />
            <h2 className="salary-title">
              Min <span>Business Income</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {dollar}
                {Math.min(...businessIncomes.map((item) => item.amount))}
              </p>
              <p>
                {dollar}
                {Math.max(...businessIncomes.map((item) => item.amount))}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Business Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {dollar}
                {Math.min(...businessExpenses.map((item) => item.amount))}
              </p>
              <p>
                {dollar}
                {Math.max(...businessExpenses.map((item) => item.amount))}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 2rem;
            margin-top: 7%;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 2.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export default BusinessDashboard;
