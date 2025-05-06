import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./assests/Images/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
// import Expense from "./components/Business/Expense";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import { AuthProvider } from "./context/authContext";
import Choice from "./components/Choice/Choice";
import MainHome from "./components/Home/Home";
import BusinessDashboard from "./pages/Business/BusinessDashboard";
import BusinessIncome from "./pages/Business//BusinessIncomeFold/BusinessIncome";
import Analysis from "./pages/Analysis/Analysis";
// import BusinessExpenseForm from "./pages/Business/BusinessExpense/ExpenseForm";
// import BusinessIncomeForm from "./pages/Business/BusinessIncomefold/BusinessIncomeForm";
import BusinessExpense from "./pages/Business/BusinessExpense/BusinessExpense";

// import Personal from "./components/Personal/Personal";
// import { useGlobalContext } from "./context/globalContext";
// const Business = () => <div>Welcome to Business Dashboard</div>;
// const Personal = () => <div>Welcome to Personal Dashboard</div>;
function App() {
  const [active, setActive] = useState(1);

  // const global = useGlobalContext();
  // console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };
  const businessDisplay = () => {
    switch (active) {
      case 1:
      // return <BusinessDashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <BusinessIncome />;
      case 4:
        return <BusinessExpense />;

      default:
      // return <Dashboard />;
    }
  };
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppStyled bg={bg} className="App">
          {orbMemo}
          <Routes>
            <Route
              path="/main"
              element={
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>{displayData()}</main>
                </MainLayout>
              }
            />
            <Route
              path="/busi"
              element={
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>{businessDisplay()}</main>
                </MainLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/choice" element={<Choice />} />
            <Route path="/" element={<MainHome />} />
            <Route path="/busi" element={<BusinessDashboard />} />
            <Route path="/nan" element={<Analysis />} />
          </Routes>
        </AppStyled>
      </BrowserRouter>
    </AuthProvider>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
