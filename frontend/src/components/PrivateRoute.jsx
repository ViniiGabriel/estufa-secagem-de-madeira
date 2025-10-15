import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  if (!adminUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
