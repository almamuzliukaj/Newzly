import { Routes, Route } from "react-router-dom";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
import ForgotPassword from "./auth/ForgotPassword";
import AllNews from "./pages/AllNews";
import TopHeadlines from "./pages/TopHeadlines";
import CountryNews from "./pages/CountryNews";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Preferences from "./pages/Preferences";

function App() {
  return (
    <Routes>
      {/* Public routes - accessible without login */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes - accessible only if authenticated */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout /> {/* Layout wraps nested routes */}
          </ProtectedRoute>
        }
      >
        {/* Nested routes inside Layout */}
        <Route index element={<AllNews />} /> {/* Default home page */}
        <Route path="all-news" element={<AllNews />} /> {/* All news page */}
        <Route path="top-headlines" element={<TopHeadlines />} /> {/* Top headlines page */}
        <Route path="country/:iso" element={<CountryNews />} /> {/* News by country based on ISO code */}
        <Route path="preferences" element={<Preferences />} /> {/* User preferences page */}
      </Route>
    </Routes>
  );
}

export default App;
