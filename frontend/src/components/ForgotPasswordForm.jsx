import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ForgotPasswordForm.css';

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/users/forgot-password", {
        email,
      });

      setMessage("✅ Reset link sent! Check your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to send reset link.");
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remember your password?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;
