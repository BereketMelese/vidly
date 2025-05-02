import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import authService from "../../services/authService";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;
