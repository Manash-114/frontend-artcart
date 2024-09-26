import { Avatar, Badge, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { signout } from "../../reduxToolkit/features/authSlice";
import {
  logOut,
  selectCurrentUser,
} from "../../reduxToolkit/features/auth/authSlice";

const Header = () => {
  let totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <NavLink to="/" className="flex items-center space-x-3 text-white">
          <img
            src="/images/Logo.jpg"
            alt="logo"
            className="rounded-full h-12 w-12"
          />
          <h2 className="text-xl font-semibold">ArtCart</h2>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/products"
            className="text-white hover:text-yellow-300 transition-colors"
          >
            Products
          </NavLink>

          {user === null && (
            <>
              <NavLink
                to="/seller/signup"
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Become a Seller
              </NavLink>
              <NavLink
                to="/admin"
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Admin
              </NavLink>
            </>
          )}

          {user !== null ? (
            <>
              <div
                className="flex items-center cursor-pointer space-x-2 text-white hover:text-yellow-300 transition-colors"
                onClick={handleClick}
              >
                <Avatar className="h-9 w-9">
                  <AccountCircleIcon fontSize="large" />
                </Avatar>
                <span className="capitalize">Account</span>
              </div>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <NavLink to="/wishlist" className="text-black no-underline">
                  <MenuItem onClick={handleClose}>
                    <FavoriteBorderOutlinedIcon />
                    WishList
                  </MenuItem>
                </NavLink>
                <NavLink to="/orders" className="text-black no-underline">
                  <MenuItem onClick={handleClose}>
                    <ListAltIcon />
                    Orders
                  </MenuItem>
                </NavLink>
                <MenuItem onClick={handleClose}>
                  <div onClick={handleLogout} className="flex items-center">
                    <LogoutIcon />
                    <span className="ml-2">Logout</span>
                  </div>
                </MenuItem>
              </Menu>

              <NavLink
                to="/cartPage"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
              >
                <Badge badgeContent={totalQuantity} color="warning">
                  <ShoppingCartIcon className="h-6 w-6" />
                </Badge>
                <span>Cart</span>
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="h-8 w-8" />
            ) : (
              <MenuIcon className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-4 fixed top-16 left-0 w-full z-40">
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/products"
              onClick={toggleMobileMenu}
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Products
            </NavLink>

            {user === null && (
              <>
                <NavLink
                  to="/seller/signup"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Become a Seller
                </NavLink>
                <NavLink
                  to="/admin"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Admin
                </NavLink>
              </>
            )}

            {user !== null ? (
              <>
                <NavLink
                  to="/wishlist"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Wishlist
                </NavLink>
                <NavLink
                  to="/orders"
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/cartPage"
                  onClick={toggleMobileMenu}
                  className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
                >
                  <Badge badgeContent={totalQuantity} color="warning">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </Badge>
                  <span>Cart</span>
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={toggleMobileMenu}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Login
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
