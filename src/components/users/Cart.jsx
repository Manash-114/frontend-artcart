import { Button } from "@mui/material";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SingleCart from "./SingleCart";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  let totalAmount = useSelector((state) => state.cart.cartTotalAmount);
  let totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const navigate = useNavigate();
  const handleCheckOut = () => {
    navigate("/billing");
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="text-center py-8 bg-white shadow-md">
        <LocalMallIcon className="text-5xl text-green-600" />
        <span className="text-2xl font-bold ml-2">My Cart</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-xl font-semibold">Your cart is empty!</p>
          <Link
            to="/products"
            className="text-blue-500 mt-4 text-lg underline hover:text-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-4/5 mx-auto py-4 border-b bg-white shadow-sm mt-4">
            <Link
              to="/products"
              className="text-sm flex items-center font-medium text-gray-600 hover:text-gray-800"
            >
              <ArrowBackIosIcon className="h-4" />
              Continue Shopping
            </Link>
            <span className="font-semibold text-lg">{totalQuantity} items</span>
          </div>

          <div className="w-4/5 mx-auto flex flex-col lg:flex-row gap-8 py-8">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              {cartItems.map((item) => (
                <SingleCart key={item.id} item={item} />
              ))}
            </div>
            <div className="lg:w-1/3 p-4 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center mt-6">
                <p className="font-medium text-gray-700">Subtotal</p>
                <p className="flex items-center font-semibold text-gray-800">
                  <CurrencyRupeeIcon className="h-5" />
                  {totalAmount}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="font-medium text-gray-700">Shipping cost</p>
                <p className="flex items-center font-semibold text-gray-800">
                  <CurrencyRupeeIcon className="h-5" /> 10
                </p>
              </div>
              <div className="flex justify-between items-center text-red-500 mt-4">
                <p className="font-medium">Shipping Discount</p>
                <p className="flex items-center font-semibold">
                  - <CurrencyRupeeIcon className="h-5" /> 10
                </p>
              </div>

              <div className="flex justify-between items-center font-bold text-lg mt-6 text-gray-800">
                <p>Estimated Total</p>
                <p className="flex items-center">
                  <CurrencyRupeeIcon className="h-5" />
                  {totalAmount}
                </p>
              </div>
              <Button
                variant="contained"
                className="w-full mt-6 bg-green-600 text-white hover:bg-green-700 rounded-full py-2"
                startIcon={<LockIcon />}
                onClick={handleCheckOut}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
