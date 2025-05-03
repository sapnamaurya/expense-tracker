import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [err, setErr] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.password !== input.rePassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const { username, email, password } = input;

      const res = await axios.post("http://localhost:4000/api/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
      setErr(
        err.response?.data?.message || "Register failed. Please try again."
      );
    }
  };

  return (
    <RegisterStyled>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              required
              type="text"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Re-enter Password</label>
            <input
              required
              type="password"
              placeholder="Re-enter your password"
              name="rePassword"
              onChange={handleChange}
            />
          </div>

          {passwordMismatch && <p className="error">Passwords do not match</p>}
          {err && <p className="error">{err}</p>}

          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </RegisterStyled>
  );
};

export default Register;

const RegisterStyled = styled.div`
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
    max-width: 540px;

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
    }

    .login-link {
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
