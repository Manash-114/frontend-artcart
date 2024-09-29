import React from "react";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { CurrencyRupee } from "@mui/icons-material";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const cartAmount = useSelector((state) => state.cart.cartTotalAmount);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
        {/* Product Details Section */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md p-4 w-full max-w-lg"
              key={item.id}
            >
              <div className="w-full md:w-32 h-32 p-2">
                <img
                  src={item.productImages[0].name}
                  alt={item.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-0 md:ml-4 flex-1 mt-4 md:mt-0">
                <p className="font-semibold text-md">{item.name}</p>
                <p className="mt-4 text-green-600 flex items-center">
                  <CurrencyRupee className="h-5 w-5" />
                  <span className="ml-1 text-lg">{item.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:max-w-sm border border-gray-300 rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-center text-lg font-semibold uppercase text-gray-700 border-b border-gray-200 pb-4">
            Order Summary
          </h2>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <ShoppingCartCheckoutOutlinedIcon />
              <span className="ml-2">
                <span className="text-green-600 font-medium">
                  ( {cartQuantity} )
                </span>{" "}
                items in cart
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="font-medium">Order Subtotal</div>
              <div className="flex items-center">
                <CurrencyRupeeOutlinedIcon className="h-5 w-5" />
                <span className="ml-1 text-xl">{cartAmount}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-red-500 line-through">
              <div className="font-medium">Delivery Charges</div>
              <div className="flex items-center">
                <CurrencyRupee className="h-5 w-5" />
                <span className="ml-1">10</span>
              </div>
            </div>
            <div className="flex justify-between items-center font-bold border-t border-gray-300 pt-4">
              <div>Total Payable</div>
              <div className="flex items-center">
                <CurrencyRupeeOutlinedIcon className="h-5 w-5" />
                <span className="ml-1 text-xl">{cartAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
