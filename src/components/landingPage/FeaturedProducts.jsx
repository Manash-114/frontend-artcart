import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteOutlined } from "@mui/icons-material";
import toast, { Toaster, useToaster } from "react-hot-toast";
import {
  addToWishList,
  clearToastMessage,
  removeFromWishList,
} from "../../reduxToolkit/features/productList/WishListSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const FeatureProducts = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

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
          initialSlide: 1,
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
  const [value, setValue] = useState(2);

  const featuredProducts = useSelector((state) => state.product.products);

  const handleClick = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };

  const dispatch = useDispatch();
  const [clickedProductId, setClickedProductId] = useState(null);

  const toastMessage = useSelector((state) => state.wishlist.toastMessage);

  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === "added") {
        toast.success(toastMessage.text);
      } else if (toastMessage.type === "removed") {
        toast.error(toastMessage.text);
      }
      // Clear toast message after displaying
      dispatch(clearToastMessage());
    }
    // Clear toast message on unmount
  }, [dispatch, toastMessage]);

  const handleFavoriteClick = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    //finding individual item
    const product = featuredProducts.find((product) => product.id === id);
    dispatch(addToWishList({ product, quantity: 1 }));
  };

  //color
  const [clickedProducts, setClickedProducts] = useState([]);

  const handleColorClick = (productId) => {
    const newClickedProducts = [...clickedProducts]; // Create a copy
    const productIndex = newClickedProducts.indexOf(productId);

    if (productIndex !== -1) {
      // Remove product from clicked state if already clicked
      newClickedProducts.splice(productIndex, 1);
    } else {
      // Add product to clicked state if not clicked yet
      newClickedProducts.push(productId);
    }

    setClickedProducts(newClickedProducts);
  };

  const wishlistColor = useSelector((state) => state.wishlist.items);
  // console.log(wishlistColor)
  return (
    <Carousel>
      <Toaster position="top-center" reverseOrder={false} />
      <h2>Featured Products</h2>

      <Slider {...settings}>
        {featuredProducts.slice(0, 7).map((p) => {
          return (
            <NavLink
              key={p.id}
              to={`/product/${p.id}`}
              className="Flink"
              onClick={handleClick}
            >
              <Wrapper className={`grid-items`}>
                <div
                  className="wish"
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
                    onClick={() => handleColorClick(p.id)}
                  />
                </div>
                <div className="image">
                  <img src={p.productImages[0]?.name} alt={p.name}></img>
                </div>
                <div className="content">
                  {/* <div className="rate">
                      <Rating
                        className='star'
                        size='small'
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        readOnly
                      />
                      ( {p.rating} )
                    </div> */}
                  <div className="miniContainer">
                    <div className="dp">
                      <img src="/images/profile.png" alt="profile"></img>
                    </div>
                    <div className="subContent">
                      <div className="title">
                        {p.name.length > 20
                          ? `${p.name.slice(0, 18)}..`
                          : p.name}
                      </div>
                      <div className="price">
                        <CurrencyRupeeIcon
                          style={{
                            color: "black",
                            height: "1rem",
                          }}
                        />
                        {p.price}
                      </div>
                    </div>
                  </div>
                  <p id="author">~ {p.seller.name}</p>
                  <span id="cat">{p.category.name}</span>
                </div>
              </Wrapper>
            </NavLink>
          );
        })}
      </Slider>
    </Carousel>
  );
};

export default FeatureProducts;
const Wrapper = styled.div`
  /* background-image: linear-gradient(to bottom, rgba(78, 77, 77, 0.041),rgba(118, 114, 114, 0.151), rgba(122, 119, 119, 0.356)); */
  background-image: linear-gradient(
    to top,
    rgb(255, 254, 254),
    rgba(250, 237, 217, 0.84),
    rgba(248, 244, 238, 0.674)
  );
  border: 1px solid black;
  border-radius: 15px;
  height: 330px;
  width: 85%;
  position: relative;
  &:hover {
    box-shadow: 0px 6px 8px rgba(229, 142, 12, 0.703);
  }
  .Flink {
  }
  .wish {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    border-radius: 50%;
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    opacity: 95%;
    cursor: pointer;
    border: 1.5px solid #8b2703;
  }

  .image {
    /* background-color: #ded6e1aa; */
    /* border: 1px solid yellow; */
    border-radius: 15px;
    height: 90%;
    padding-top: 10px;
    /* background-color: inherit; */
  }
  img {
    height: 80%;
    width: 100%;
    object-fit: contain;
  }
  .miniContainer {
    display: flex;
    margin-top: 1rem;
  }
  .dp {
    flex: 0.2;
    padding-left: 5px;
    padding-top: 2px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    img {
      height: 25px;
      width: 25px;
    }
  }
  .subContent {
    flex: 1;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .title {
    font-weight: 540;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .price {
    width: 30%;
    margin-right: 2px;
    color: green;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price > img {
    padding-right: 5px;
    height: 1rem;
    width: 1rem;
  }
  .star {
    padding-left: 1.2rem;
  }
  #author {
    font-weight: 500;
    font-size: 13px;
    padding-left: 20%;
  }
  #cat {
    font-weight: 600;
    padding-left: 22%;
    font-size: 15px;
    color: #82400b;
  }
`;
const Carousel = styled.div`
  padding: 1rem 4rem 4rem;
  padding-right: 8rem;
  background-image: linear-gradient(
    to bottom,
    rgba(78, 77, 77, 0.041),
    rgba(0, 0, 0, 0.178),
    rgba(0, 0, 0, 0.804)
  );
  color: #fff;
  /* border: 1px solid white; */

  .Flink {
    margin-left: 3rem;
    text-decoration: none;
    color: black;
    /* border: 1px solid white; */
    height: 350px;
  }

  h2 {
    text-align: center;
    margin: 1.5rem auto 3.5rem;
    font-size: 2rem;
    color: #fff;
    font-weight: 600;
  }

  .box {
    background-color: #60b060;
    height: 400px;
    border-radius: 10%;
  }
  .box h3 {
    text-align: center;
  }
  .slick-track {
    position: relative;
    top: 0;
    left: -5px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  /* .slick-slide div{
    
  } */
  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 40px;
    line-height: 1;
    opacity: 0.75;
    color: #b5ae8c;
  }
  .slick-next {
    right: -20px !important;
  }
  .slick-prev {
    left: -2px !important;
    z-index: 99;
  }
  .slick-dots li.slick-active button:before {
    color: #5dcf5d !important;
  }
  .slick-dots li button:before {
    color: #fff;
    font-size: 1rem;
    top: 2rem;
  }

  .image {
    z-index: 555;
    height: 60%;
    width: 100%;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  img {
    height: 90%;
    width: 100%;
    object-fit: contain;
  }
  .feature-link {
  }
`;
