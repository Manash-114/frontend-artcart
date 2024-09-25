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
      <nav className="bg-gradient-to-r from-yellow-200 via-blue-200 to-gray-100 py-4 px-8 uppercase text-sm">
        <span className="text-blue-800 font-semibold">Home</span> / product /{" "}
        {name}
      </nav>
      {items ? (
        <div className="container mx-auto py-10 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-1/2">
            {/* Image Section */}
            <ImageProduct data={items} />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-semibold">{items.name}</h1>
                <div className="text-teal-600 text-sm mt-2">
                  {items.category.name}
                </div>
              </div>
            </div>
            <div className="text-green-700 text-lg flex items-center space-x-1">
              <CurrencyRupeeIcon className="text-green-600" />
              <span className="font-semibold">{items.price}</span>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outlined"
                color="warning"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                className="text-yellow-600 border-yellow-600"
              >
                Add to cart
                <Toaster position="top-center" reverseOrder={true} />
              </Button>

              <Button
                variant="outlined"
                color="success"
                startIcon={<BoltIcon />}
                onClick={handleBuyNow}
                className="text-green-600 border-green-600"
              >
                Buy Now
              </Button>
            </div>

            <div className="border-t pt-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Product Descriptions
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify lg:text-left">
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
