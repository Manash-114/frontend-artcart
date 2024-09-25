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
    dispatch(decreaseQuantity(item.id));
  };
  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDelete = () => {
    toast.error("Product Removed!");
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-4 border rounded-lg shadow-lg">
      <div className="col-span-1 flex justify-center items-center">
        <img
          src={item.productImages[0].name}
          alt={item.name}
          className="h-24 w-24 object-cover rounded-lg"
        />
      </div>
      <div className="col-span-1 flex flex-col justify-center">
        <p className="font-semibold text-lg">{item.name}</p>
        <span className="text-gray-600">
          Category: <span className="font-medium">{item.category.name}</span>
        </span>
        <span className="text-green-600 font-medium">
          In Stock: {item.stock}
        </span>
      </div>
      <div className="col-span-1 flex flex-col justify-center text-center">
        <h4 className="font-medium">Each</h4>
        <div className="flex justify-center items-center">
          <CurrencyRupeeIcon className="text-black h-5" />
          <span className="font-semibold">{item.price}</span>
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-center text-center">
        <h4 className="font-medium">Quantity</h4>
        <div className="flex justify-center items-center border rounded-lg">
          <RemoveIcon className="cursor-pointer" onClick={handleDecrease} />
          <input
            className="text-center w-12 font-medium bg-transparent border-none"
            type="text"
            value={quantity}
            readOnly
          />
          <AddIcon
            className={`cursor-pointer ${
              quantity === item.stock ? "text-gray-400" : ""
            }`}
            onClick={handleIncrease}
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-center text-center">
        <h4 className="font-medium">Total</h4>
        <div className="flex justify-center items-center">
          <CurrencyRupeeIcon className="text-black h-5" />
          <span className="font-semibold">
            {item.price * item.cartQuantity}
          </span>
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <Toaster position="top-center" reverseOrder={true} />
        <DeleteForeverIcon
          className="text-red-500 h-8 w-8 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default SingleCart;
