import { useState } from "react";
import axios from "axios";

function LoginForm({ onSwitch, onForgot }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;
      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      setMessage("✅ Login successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br />
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            onChange={handleChange}
          />
          Remember Me
        </label><br />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Register
        </button>
      </p>

      <p>
        Forgot password?{" "}
        <button type="button" onClick={onForgot}>
          Click here
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
