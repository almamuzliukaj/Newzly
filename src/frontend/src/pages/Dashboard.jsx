// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear tokens from both storages
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // ✅ Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
