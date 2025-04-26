import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./context/globalContext"; // <-- ADD THIS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      {" "}
      {/* <-- WRAP everything inside GlobalProvider */}
      <GlobalStyle />
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
