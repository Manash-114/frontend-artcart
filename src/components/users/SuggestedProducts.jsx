import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import {
  addToWishList,
  clearToastMessage,
} from "../../reduxToolkit/features/productList/WishListSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const SuggestedProducts = () => {
  const { id } = useParams();
  const featuredProducts = useSelector((state) => state.product.products);

  // Find the selected product
  const selectedProduct = featuredProducts.find((product) => product.id === id);

  // Filter similar products based on category (excluding the selected product)
  const similarProducts = featuredProducts.filter(
    (product) =>
      product.category.name === selectedProduct?.category?.name &&
      product.id !== selectedProduct.id
  );

  // Limit the number of similar products to show (up to 7)
  const filterItems = similarProducts.slice(0, 6);
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.wishlist.toastMessage);

  // Handle scroll when clicking on a product
  const handleClick = () => {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Show toast notifications for wishlist actions
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

  // Handle adding/removing favorites (wishlist)
  const handleFavoriteClick = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    const product = featuredProducts.find((product) => product.id === id);
    dispatch(addToWishList({ product, quantity: 1 }));
  };

  // Get wishlist items to determine if a product is favorited
  const wishlistColor = useSelector((state) => state.wishlist.items);

  return (
    <div className="py-10 px-8 lg:px-24 bg-gradient-to-b from-gray-700/10 to-black/90 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-semibold text-center mb-10">
        Similar Products
      </h2>

      <Slider {...settings} className="slick-slider-padding">
        {similarProducts.map((p) => (
          <div key={p.id} className="px-2">
            <NavLink
              to={`/product/${p.id}`}
              className="block p-4 bg-white border border-gray-300 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative flex flex-col justify-between h-80">
                <div
                  className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer"
                  onClick={(event) => handleFavoriteClick(p.id, event)}
                >
                  <FavoriteOutlined
                    style={{
                      color: wishlistColor.some(
                        (item) => item.product.id === p.id
                      )
                        ? "crimson"
                        : "lightgray",
                    }}
                  />
                </div>
                <div className="image flex justify-center items-center h-44">
                  <img
                    src={p.productImages[0]?.name}
                    alt={p.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="content mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium truncate">
                      {p.name.length > 20 ? `${p.name.slice(0, 18)}..` : p.name}
                    </div>
                    <div className="text-green-600 font-semibold flex items-center">
                      <CurrencyRupeeIcon className="h-4 w-4" />
                      {p.price}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Seller - {p.seller.name}
                  </p>
                  <span className="text-xs text-orange-600 font-semibold">
                    {p.category.name}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestedProducts;
