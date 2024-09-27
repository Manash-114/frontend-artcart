import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";

const AdminNav = () => {
  const dispatch = useDispatch();
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 shadow-lg p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src="/images/Logo.jpg"
          alt="logo"
          className="h-12 w-12 rounded-full"
        />
        <h2 className="text-white text-lg font-semibold">ArtCart</h2>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/admin" className="text-white hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={() => dispatch(logOut())}
            className="text-white hover:text-yellow-400"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
