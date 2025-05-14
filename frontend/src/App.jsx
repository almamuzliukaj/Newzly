import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import './styles/App.css';

function Logout() {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  navigate("/login");
  return null;
}

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm onSwitch={toggleForm} />} />
        <Route path="/register" element={<RegisterForm onSwitch={toggleForm} />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* ✅ FIXED: tani përmban `/*` që lejon child-routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
