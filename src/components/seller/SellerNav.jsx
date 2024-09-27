import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";

const SellerNav = () => {
  const dispatch = useDispatch();
  return (
    <nav className="bg-gradient-to-r from-purple-400 via-blue-500 to-blue-700 h-16 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/images/Logo.jpg"
          alt="logo"
          className="h-12 w-12 rounded-full"
        />
        <h2 className="text-white text-lg font-semibold">ArtCart</h2>
      </div>

      <ul className="flex space-x-6">
        <li>
          <Link to="/seller" className="text-white hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/seller/login"
            className="text-white hover:text-yellow-400"
            onClick={() => dispatch(logOut())}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SellerNav;
