// src/components/RegisterForm.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      message: "",
    }));

    if (formData.password !== formData.confirmPassword) {
      setFormData((prev) => ({
        ...prev,
        message: "❌ Passwords do not match",
      }));
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setFormData((prev) => ({
        ...prev,
        message: "✅ Registration successful!",
      }));

      navigate("/login");
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        message: err.response?.data?.message || "❌ Registration failed",
      }));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {formData.message && <p>{formData.message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;
