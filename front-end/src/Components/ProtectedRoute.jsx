// src/Components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  if (userData) {
    return <Navigate to="/my-orders" replace />;
  }
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !userData.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
