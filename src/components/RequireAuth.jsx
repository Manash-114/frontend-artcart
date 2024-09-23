import { replace } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
const ROLES = {
  User: 2001,
  Admin: 2002,
  Seller: 2003,
};
import {
  selectCurrentToken,
  selectRoles,
} from "../reduxToolkit/features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  // const token = useSelector(selectCurrentToken);
  const role = useSelector(selectRoles);
  const location = useLocation();
  console.log("from require auth ");
  console.log(`roles from redux ${role}and roles from main ${allowedRoles}`);
  return allowedRoles === role ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
