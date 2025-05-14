import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginForm.css';

const API_URL = "http://localhost:5000/api/users/login";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 👉 Kjo do vendosë klasën për temën e login-it vetëm për këtë komponent
  useEffect(() => {
    document.body.classList.add("auth-theme");
    document.body.classList.remove("dashboard-theme");

    return () => {
      document.body.classList.remove("auth-theme");
    };
  }, []);

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
    setLoading(true);

    if (!formData.email || !formData.password) {
      setMessage("❌ All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(API_URL, {
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
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />{" "}
          Remember Me
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </p>

      <p>
        Forgot your password?{" "}
        <button type="button" onClick={() => navigate("/forgot-password")}>
          Reset it
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
