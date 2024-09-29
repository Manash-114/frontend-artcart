import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Rating,
} from "@mui/material";
import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ImageProduct from "./ImageProduct";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxToolkit/features/productList/CartSlice";
import toast, { Toaster } from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const items = useSelector((state) =>
    state.product.products.find((product) => product.id === id)
  );
  const { name } = items || {};

  const navigate = useNavigate();
  const selectedProduct = useSelector((state) =>
    state.product.products.find((product) => product.id === id)
  );
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    toast.success("Successfully added to cart");
    dispatch(addToCart(selectedProduct));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(selectedProduct));
    navigate("/billing");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gradient-to-r from-yellow-200 via-blue-200 to-gray-100 py-4 px-4 md:px-8 text-sm">
        <span className="text-blue-800 font-semibold">Home</span> / product /{" "}
        <span className="text-gray-700 font-medium">{name}</span>
      </nav>

      {items ? (
        <div className="container mx-auto py-10 px-4 md:px-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <ImageProduct data={items} />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{items.name}</h1>
              <div className="text-teal-600 text-sm mt-2">
                {items.category.name}
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center space-x-1 text-green-700 text-xl font-semibold">
              <CurrencyRupeeIcon className="text-green-600" />
              <span>{items.price}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Button
                variant="outlined"
                color="warning"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                className="text-yellow-600 border-yellow-600 w-full md:w-auto"
              >
                Add to cart
                <Toaster position="top-center" reverseOrder={true} />
              </Button>

              <Button
                variant="outlined"
                color="success"
                startIcon={<BoltIcon />}
                onClick={handleBuyNow}
                className="text-green-600 border-green-600 w-full md:w-auto"
              >
                Buy Now
              </Button>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Product Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {items.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default Product;
