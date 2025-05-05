import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const accountType = localStorage.getItem("accountType");
      if (accountType === "business") {
        navigate("/busi");
      } else if (accountType === "personal") {
        navigate("/main");
      } else {
        navigate("/"); // Fallback
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <LoginStyled>
      <div className="form-container">
        <h2>ExpensoMeter Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <button type="submit" disabled={isLoader}>
            {isLoader ? "Loading..." : "Login"}
          </button>

          <p className="register-link">
            New to ExpensoMeter? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </LoginStyled>
  );
};

export default Login;
const LoginStyled = styled.div`
  min-height: 100vh;
  background: #f7f9fc;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container {
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(6px);
    border-radius: 24px;
    line-height: 4vh;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;

    h2 {
      margin-bottom: 1.5rem;
      color: #222260;
      text-align: center;
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 12px;
        border: 1px solid #ccc;
        font-size: 1rem;
        background-color: white;

        &:focus {
          border-color: #222260;
          outline: none;
        }
      }
    }

    .error {
      color: #ff4d4f;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      background-color: #222260;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #3737a5;
      }

      &:disabled {
        background-color: #a0a0b0;
        cursor: not-allowed;
      }
    }

    .register-link {
      margin-top: 1rem;
      text-align: center;
      font-size: 0.95rem;

      a {
        color: #222260;
        font-weight: bold;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
