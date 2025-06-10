import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "./AuthForm.css";

function ForgotPassword() {
  const navigate = useNavigate();

  // State to hold email input
  const [email, setEmail] = useState("");
  // State to hold new password input
  const [newPassword, setNewPassword] = useState("");
  // Message to show success feedback
  const [message, setMessage] = useState("");
  // Error message for failure cases
  const [error, setError] = useState("");

  // Handler for form submission to reset password
  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Call API to reset password
      const res = await axios.post(`${API_BASE_URL}/users/reset-password`, {
        email,
        newPassword,
      });

      // Show success message from response or default text
      setMessage(res.data.message || "Password successfully reset.");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Show error message if API call fails
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="login-background">
      <div className="auth-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset} className="auth-form">
          {/* Show error message if any */}
          {error && <p className="error-msg">{error}</p>}
          {/* Show success message if any */}
          {message && <p className="success-msg">{message}</p>}
          {/* Email input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* New password input */}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {/* Submit button */}
          <button type="submit">Reset Password</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
