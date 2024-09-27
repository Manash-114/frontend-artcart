import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectRoles } from "../reduxToolkit/features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const role = useSelector(selectRoles);
  const location = useLocation();

  return allowedRoles === role ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
