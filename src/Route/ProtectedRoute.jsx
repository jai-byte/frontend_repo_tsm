/* eslint-disable */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath, children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("TajurbaAdminUser"));

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;
