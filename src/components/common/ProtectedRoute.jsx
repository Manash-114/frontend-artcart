import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../../apiCalls/getCurrentUser";

const ProtectedRoute = ({ Component }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (!token) {
      console.log("no token ");
      navigate("/login");
    } else {
      getCurrentUser(token, navigate, dispatch);
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
