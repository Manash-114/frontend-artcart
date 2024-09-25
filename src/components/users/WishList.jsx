import { Button } from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // New icon import for "Continue Shopping"
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../reduxToolkit/features/productList/WishListSlice";
import { addToCart } from "../../reduxToolkit/features/productList/CartSlice";

const WishList = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const CustomModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg font-medium">
            Are you sure you want to delete?
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <Button
              variant="contained"
              className="bg-green-600 text-white"
              onClick={onConfirm}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              className="bg-red-600 text-white"
              onClick={onCancel}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const handleDelete = () => {
    dispatch(removeFromWishList(itemToDelete));
    setModalOpen(false);
    toast.success("Selected item removed.");
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const addToBag = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Item added to cart successfully.");
  };

  return (
    <section className="relative min-h-screen bg-gray-50">
      {/* Centering the WishList Header */}
      <div className="flex justify-center items-center p-4 bg-white border-b border-gray-300 shadow-sm relative">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">My WishList</h1>
          <p className="text-sm text-gray-500">{wishlistItems.length} items</p>
        </div>
        <NavLink
          to="/products"
          className="absolute right-4 flex items-center text-gray-700 hover:text-gray-900"
        >
          <ShoppingCartIcon className="mr-1" />{" "}
          {/* New Icon for Continue Shopping */}
          <span>Continue Shopping</span>
        </NavLink>
      </div>

      <div className="p-6">
        <Toaster position="top-center" reverseOrder={false} />
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <span className="text-lg font-medium text-gray-700">
              Your wishlist is empty!
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {wishlistItems.map((item) => (
              <div key={item.product.id} className="relative group">
                <NavLink
                  to={`/product/${item.product.id}`}
                  className="no-underline text-black"
                >
                  <div className="border rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 ease-in-out relative bg-white">
                    <div className="relative">
                      {/* Adjusting the image size */}
                      <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                        <img
                          src={item.product.productImages[0].name}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                        <Button
                          variant="contained"
                          className="bg-white text-black font-semibold hover:bg-gray-200"
                          onClick={(e) => addToBag(item.product, e)}
                        >
                          Move to Bag
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 flex flex-col items-center text-center">
                      <h2 className="text-lg font-medium text-gray-800">
                        {item.product.name}
                      </h2>
                      <p className="text-green-600 font-bold text-md">
                        ₹ {item.product.price}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.category.name}
                      </p>
                    </div>
                  </div>
                </NavLink>
                {/* Fixing the close button position */}
                <CancelIcon
                  className="absolute top-2 right-2 text-red-600 cursor-pointer z-10 bg-white rounded-full p-1"
                  onClick={() => {
                    setItemToDelete(item.product.id);
                    setModalOpen(true);
                  }}
                />
                <CustomModal
                  isOpen={modalOpen}
                  onCancel={handleCancel}
                  onConfirm={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
