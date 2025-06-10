import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "./AuthForm.css";

function RegisterForm() {
  const navigate = useNavigate();

  // State for full name input
  const [name, setName] = useState("");
  // State for email input
  const [email, setEmail] = useState("");
  // State for password input
  const [password, setPassword] = useState("");
  // Error message state
  const [error, setError] = useState("");

  // Handler for registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call API to register user
      await axios.post(`${API_BASE_URL}/users/register`, {
        name,
        email,
        password,
      });

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      // Show error message on failure
      setError("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="login-background">
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          {/* Show error message if any */}
          {error && <p className="error-msg">{error}</p>}
          {/* Full name input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Submit button */}
          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
