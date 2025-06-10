import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "./AuthForm.css";

function LoginForm() {
  const navigate = useNavigate();

  // State for email input
  const [email, setEmail] = useState("");
  // State for password input
  const [password, setPassword] = useState("");
  // State for "Remember me" checkbox
  const [remember, setRemember] = useState(false);
  // Error message state
  const [error, setError] = useState("");

  // Handler for login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call API to login
      const res = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });

      const token = res.data.token;

      // Store token in localStorage if "Remember me" checked, else in sessionStorage
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Remove any previous cache notice so it shows only once after login
      localStorage.removeItem("has-shown-cache-notice");

      // Redirect to "all-news" page on success
      navigate("/all-news");
    } catch (err) {
      // Show error on failure
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-background">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          {/* Show error message if any */}
          {error && <p className="error-msg">{error}</p>}
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
          {/* Remember me checkbox */}
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          {/* Submit button */}
          <button type="submit">Login</button>
          <p>
            Don’t have an account? <a href="/register">Register</a>
          </p>
          <p>
            Forgot your password? <a href="/forgot-password">Reset it</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
