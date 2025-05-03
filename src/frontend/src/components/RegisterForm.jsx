import { useState } from "react"; 
import axios from "axios";

function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage("User registered successfully!");
      console.log("Registration response:", res.data);
      // Mund të shtosh edhe redirect ose switch në login këtu
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      console.error("Registration error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />

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