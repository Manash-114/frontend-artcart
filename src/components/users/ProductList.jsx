import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import {
  addToWishList,
  clearToastMessage,
} from "../../reduxToolkit/features/productList/WishListSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductList = ({ currentProducts }) => {
  const selectedProducts = useSelector((state) => state.product.products);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.wishlist.toastMessage);

  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === "added") {
        toast.success(toastMessage.text);
      } else if (toastMessage.type === "removed") {
        toast.error(toastMessage.text);
      }
      dispatch(clearToastMessage());
    }
  }, [dispatch, toastMessage]);

  const handleFavoriteClick = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    const product = selectedProducts.find((product) => product.id === id);
    dispatch(addToWishList({ product, quantity: 1 }));
  };

  const wishlistColor = useSelector((state) => state.wishlist.items);

  return (
    <div className="flex justify-center w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-screen-lg w-full mx-auto">
        {product.loading && (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
        {!product.loading && currentProducts.length ? (
          currentProducts.map((p) => (
            <NavLink
              key={p.id}
              to={`/product/${p.id}`}
              className="block bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden p-4 min-w-[250px]"
            >
              <div className="relative h-[20rem] p-4 flex flex-col justify-start">
                {/* Favorite Icon */}
                <div className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 bg-white cursor-pointer">
                  <FavoriteOutlined
                    style={{
                      color: wishlistColor.some(
                        (item) => item.product.id === p.id
                      )
                        ? "crimson"
                        : "lightgray",
                    }}
                    onClick={(event) => handleFavoriteClick(p.id, event)}
                  />
                </div>

                {/* Image Container */}
                <div className="h-40 w-full flex justify-center items-center overflow-hidden">
                  <img
                    src={p.productImages[0].name}
                    alt={p.name}
                    className="h-full w-auto object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="mt-2 text-center flex flex-col space-y-1">
                  <div className="font-semibold text-lg truncate">{p.name}</div>
                  <div className="text-green-600 font-bold text-xl ">
                    ₹{p.price}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    Sold by: {p.seller.name}
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="col-span-full text-center">No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
