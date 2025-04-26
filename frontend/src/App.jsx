// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import bg from "./assests/Images/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
// import Login from "./components/Login";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Register from "./components/Register/index.jsx";
// import MainPage from "./pages/MainPage/index.jsx";
// import HomePage from "./pages/HomePage";
// import ExpenseNotes from "./components/ExpenseNotes";
// import ExpenseAnalysis from "./components/Analysis/index.jsx";
// import Footer from "./components/Footer/Footer.jsx";
function App() {
  // const [expenses, setExpenses] = useState([]);
  return (
    <>
      <AppStyled bg={bg} className="App">
        <Orb />
        <MainLayout>
          <h1>hello</h1>
        </MainLayout>
      </AppStyled>
    </>
    // <BrowserRouter>
    //   <Routes>
    //     {/* <Route path="/login" element={<Login />} /> */}
    //     {/* <Route path="/register" element={<Register />} /> */}
    //     <Route path="/" element={<HomePage />} />
    //     {/* <Route path="/home" element={<HomePage />} /> */}

    //     {/* <Route path="/mainpage" element={<MainPage />} /> */}
    //     {/* <Route path="/expense" element={<ExpenseNotes />} /> */}
    //     {/* <Route
    //       path="/entry"
    //       element={
    //         <ExpenseEntry expenses={expenses} setExpenses={setExpenses} />
    //       }
    //     /> */}
    //     {/* <Route path="/footer" element={<Footer />} /> */}

    //     {/* <Route path="/analysis" element={<ExpenseAnalysis />} /> */}
    //   </Routes>
    // </BrowserRouter>
  );
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
`;
export default App;
