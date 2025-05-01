import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom"; // Corrected for useNavigate
import Header from "../Header/index.jsx";
import Footer from "../Footer/Footer.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isLoader, setIsLoader] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoader(true); // Start the loader

    // Simulate API call here (replace with actual API call)
    setTimeout(() => {
      setIsLoader(false);
      localStorage.setItem("userData", JSON.stringify(formData)); // Store data for simulation
      navigate("/login"); // Redirect to login page after successful registration
    }, 1500); // Simulate 1.5s delay for registration
  };

  return (
    <>
      <Header />
      <div className="main-sign-up">
        <div className="signUp-container">
          <h1>Create an account</h1>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <label>
              <b>Your name</b>
            </label>
            <input
              className="padding-sec"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First and last name"
              required
            />

            {/* Email Input */}
            <label>
              <b>Mobile number or Email</b>
            </label>
            <input
              className="padding-sec"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />

            {/* Password Input */}
            <label>
              <b>Password</b>
            </label>
            <input
              className="padding-sec"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />

            {/* Confirm Password Input */}
            <label>
              <b>Re-enter password</b>
            </label>
            <input
              className="padding-sec"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter password"
            />

            {/* Password Info */}
            <p className="password-info">
              Passwords must be at least 6 characters.
            </p>

            {/* Display Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Loader */}
            {isLoader && <div className="loader">Loading...</div>}

            <button type="submit">Create your account</button>
          </form>

          {/* Link to Login */}
          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} id="sign-color">
              Login
            </span>
          </p>
        </div>

        <div className="sign-footer">{/* <BasicFooter /> */}</div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
