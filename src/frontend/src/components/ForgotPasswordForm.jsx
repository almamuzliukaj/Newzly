import { useState } from "react";
import axios from "axios";

function ForgotPasswordForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage("📧 Check your inbox for reset link.");
      console.log(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to send reset link");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remembered your password?{" "}
        <button type="button" onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;
