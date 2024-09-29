import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import toast, { Toaster } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../reduxToolkit/features/productList/CartSlice";

const SingleCart = ({ item }) => {
  const [quantity, setQuantity] = useState(item.cartQuantity);

  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(item.cartQuantity);
  }, [item.cartQuantity]);

  const handleDecrease = () => {
    if (quantity > 1) dispatch(decreaseQuantity(item.id));
  };
  const handleIncrease = () => {
    if (quantity < item.stock) dispatch(increaseQuantity(item.id));
  };

  const handleDelete = () => {
    toast.error("Product Removed!");
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-200 ease-in-out">
      {/* Image Section */}
      <div className="col-span-1 flex justify-center items-center">
        <img
          src={item.productImages[0].name}
          alt={item.name}
          className="h-24 w-24 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="col-span-1 flex flex-col justify-center">
        <p className="font-semibold text-lg">{item.name}</p>
      </div>

      {/* Quantity Section */}
      <div className="col-span-1 flex flex-col justify-center text-center">
        <h4 className="font-medium text-gray-700">Quantity</h4>
        <div className="flex justify-center items-center border rounded-lg">
          <RemoveIcon
            className={`cursor-pointer p-1 ${
              quantity === 1 ? "text-gray-400" : "text-black hover:text-red-500"
            }`}
            onClick={handleDecrease}
          />
          <input
            className="text-center w-12 font-medium bg-transparent border-none"
            type="text"
            value={quantity}
            readOnly
          />
          <AddIcon
            className={`cursor-pointer p-1 ${
              quantity === item.stock
                ? "text-gray-400"
                : "text-black hover:text-green-500"
            }`}
            onClick={handleIncrease}
          />
        </div>
      </div>

      {/* Total Price Section */}
      <div className="col-span-1 flex flex-col justify-center text-center">
        <h4 className="font-medium text-gray-700">Total</h4>
        <div className="flex justify-center items-center">
          <CurrencyRupeeIcon className="text-black h-5" />
          <span className="font-semibold">
            {item.price * item.cartQuantity}
          </span>
        </div>
      </div>

      {/* Delete Icon */}
      <div className="col-span-1 flex justify-center items-center">
        <Toaster position="top-center" reverseOrder={true} />
        <DeleteForeverIcon
          className="text-red-500 h-8 w-8 cursor-pointer hover:scale-110 transition transform duration-200 ease-in-out"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default SingleCart;
