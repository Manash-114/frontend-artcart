import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CircularProgress, Pagination, Rating } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import {
  addToWishList,
  clearToastMessage,
} from "../../reduxToolkit/features/productList/WishListSlice";
import toast, { Toaster } from "react-hot-toast";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProductList = ({ currentProducts }) => {
  const [value, setValue] = useState(2);
  const selectedProducts = useSelector((state) => state.product.products);
  const product = useSelector((state) => state.product);
  // console.log(product);
  const dispatch = useDispatch();

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
    const product = selectedProducts.find((product) => product.id === id);
    dispatch(addToWishList({ product, quantity: 1 }));
  };

  //color
  const [clickedProducts, setClickedProducts] = useState([]);

  const handleColorClick = (productId) => {
    // console.log("wish list", productId);

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
  console.log(wishlistColor);
  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      {product.loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {!product.loading && product.products.length
        ? currentProducts.map((p) => {
            // console.log("current product ", p.id);
            return (
              <NavLink
                key={p.id}
                to={`/product/${p.id}`}
                className="grid-item-link"
              >
                <GridItem className={`grid-items`}>
                  <div
                    className="wish"
                    onClick={(event) => handleFavoriteClick(p.id, event)}
                  >
                    <FavoriteOutlined
                      style={{
                        // color: clickedProducts.includes(p.id)
                        //   ? "crimson"
                        //   : "lightgray",
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
                    <img src={p.productImages[0].name} alt="image"></img>
                  </div>
                  <div className="content">
                    {/* <div className="rate">
                      <Rating
                        className="star"
                        size="small"
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      ({p?.reviews})
                    </div> */}
                    <div className="miniContainer">
                      <div className="dp">{/* <AccountCircleIcon /> */}</div>
                      <div className="subContent">
                        <div className="title">
                          {p.name.length > 20
                            ? `${p.name.slice(0, 18)}..`
                            : p.name}
                        </div>
                        <div className="price">
                          {"\u20B9 "}
                          {p.price}
                        </div>
                      </div>
                    </div>
                    <span id="author">{p.seller.name}</span>
                    <p id="category">{p.category.name}</p>
                  </div>
                </GridItem>
              </NavLink>
            );
          })
        : null}
    </Container>
  );
};

export default ProductList;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  grid-gap: 20px 10px;

  .grid-item-link {
    text-decoration: none;
    color: black;
  }
`;
const GridItem = styled.div`
  background-image: linear-gradient(
    to top,
    rgb(255, 254, 254),
    rgba(249, 238, 220, 0.84),
    rgba(247, 236, 220, 0.674)
  );
  border: 1px solid #8f7f68;
  border-radius: 15px;
  height: 330px;
  &:hover {
    box-shadow: 0px 8px 10px rgba(229, 142, 12, 0.813);
  }
  width: 85%;
  position: relative;

  .wish {
    border: 1px solid black;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    border-radius: 50%;
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    opacity: 95%;
    cursor: pointer;
  }

  .image {
    height: 70%;
    padding-top: 10px;
  }
  img {
    height: 80%;
    width: 100%;
    object-fit: contain;
  }
  .miniContainer {
    display: flex;
  }
  .dp {
    flex: 0.2;
    padding-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 25px;
      width: 25px;
    }
  }
  .subContent {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .title {
    font-weight: 540;
    font-size: 12px;
  }
  .price {
    width: 30%;
    margin-right: 2px;
    color: green;
    font-weight: bold;
    font-size: 14px;
  }
  .price > img {
    padding-right: 5px;
    height: 12px;
    width: 10px;
  }
  .star {
    padding-left: 10px;
  }
  #author {
    font-weight: 500;
    font-size: 13px;
    padding-left: 20%;
  }
  #category {
    font-weight: 600;
    padding-left: 20%;
    font-size: 14px;
    text-transform: uppercase;
    color: #82400b;
  }
`;
