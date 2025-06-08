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
      {/* Public pages (pa login) */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Private pages */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AllNews />} />
        <Route path="all-news" element={<AllNews />} />
        <Route path="top-headlines" element={<TopHeadlines />} />
        <Route path="country/:iso" element={<CountryNews />} />
      <Route path="preferences" element={<Preferences />} />
      </Route>
    </Routes>
  );
}

export default App;
