import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChoicePage = () => {
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (choice === "business" || choice === "personal") {
      localStorage.setItem("accountType", choice); // Save selected choice
      navigate("/register");
    } else {
      alert("Please select an option.");
    }
  };

  return (
    <ChoiceStyled>
      <div className="choice-box">
        <h2>Select Account Type</h2>
        <div className="options">
          <label>
            <input
              type="radio"
              value="business"
              checked={choice === "business"}
              onChange={(e) => setChoice(e.target.value)}
            />
            Business
          </label>
          <label>
            <input
              type="radio"
              value="personal"
              checked={choice === "personal"}
              onChange={(e) => setChoice(e.target.value)}
            />
            Personal
          </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </ChoiceStyled>
  );
};

const ChoiceStyled = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  .choice-box {
    background: rgba(255, 255, 255, 0.3);
    padding: 3rem;
    border-radius: 32px;
    box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    text-align: center;

    h2 {
      color: #57007b;
      margin-bottom: 2rem;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      font-size: 18px;
      margin-bottom: 2rem;

      label {
        cursor: pointer;
        color: rgba(34, 34, 96, 0.9);
      }

      input {
        margin-right: 10px;
      }
    }

    button {
      background: #57007b;
      color: white;
      padding: 10px 25px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #3d005b;
      }
    }
  }
`;

export default ChoicePage;
