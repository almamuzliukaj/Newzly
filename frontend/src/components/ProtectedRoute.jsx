// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Retrieve auth token from localStorage or sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // If no token found, redirect user to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected component(s)
  return children;
}

export default ProtectedRoute;
