// frontend/src/news/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews";
import "./App.css";

function NewsDashboard() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Routes>
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<LoginForm onSwitch={toggleForm} />} />
  <Route path="/register" element={<RegisterForm onSwitch={toggleForm} />} />
  <Route path="/forgot-password" element={<ForgotPasswordForm />} />

  {/* ✅ Rregulluar me /* që lejon child-routes */}
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

export default NewsDashboard;
