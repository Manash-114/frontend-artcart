

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { FavoriteOutlined } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import { addToWishList, clearToastMessage } from '../../reduxToolkit/features/productList/WishListSlice';

const SuggestedProducts = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [value, setValue] = useState(3  );

  const { id } = useParams();
  const featuredProducts = useSelector(state => state.product.products);
  const selectedProducts = featuredProducts.find(product => product.id === parseInt(id));
  const similarProducts = featuredProducts.filter(individualProduct => individualProduct.category === selectedProducts.category && individualProduct.id !== selectedProducts.id);
  const filterItems = similarProducts.slice(0, 7);
  const selectedProduct = useSelector(state => state.product.products);
  const dispatch = useDispatch();
  const toastMessage = useSelector(state => state.wishlist.toastMessage);

  const handleClick = () => {
    window.scrollTo({
      top: 10,
      behavior: 'smooth'
    });
  };

  
  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === 'added') {
        toast.success(toastMessage.text);
      } else if (toastMessage.type === 'removed') {
        toast.error(toastMessage.text);
      }
  
      // Clear toast message after displaying (assuming your library supports it)
      dispatch(clearToastMessage());
    }
  }, [dispatch, toastMessage]);

  const handleFavoriteClick = (id,event) => {
    event.preventDefault();
    event.stopPropagation();
    //finding individual item
    const product = selectedProduct.find(product => product.id === parseInt(id))
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
const wishlistColor = useSelector(state => state.wishlist.items);
  return (

    <Carousel>
     
      <h2>Similar Products</h2>

      <Slider {...settings}>
        {
          filterItems.map((p, index) => {
            return (
              <NavLink key={p.id} to={`/product/${p.id}`} className="Flink" onClick={handleClick}>
                <Wrapper className={`grid-items`}>
                  <div className="wish" onClick={(event) => handleFavoriteClick(p.id, event)}>
                    <FavoriteOutlined
                      style={{
                        // color: clickedProducts.includes(p.id) ? 'crimson' : 'lightgray',
                        color: wishlistColor.some(item => item.product.id === p.id) ? 'crimson' : 'lightgray',
                      }}
                      onClick={() => handleColorClick(p.id)}
                    />
                  </div>
                  <div className="image">
                    <img src={p.thumbnail} alt='image'></img>
                  </div>
                  <div className="content">
                    <div className="rate">
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
                    </div>
                    <div className="miniContainer">
                      <div className="dp">
                        <img src='/images/profile.png' alt='profile'></img>
                      </div>
                      <div className="subContent">
                        <div className="title">
                          {
                            p.title.length > 20 ? `${p.title.slice(0, 18)}..`
                              : p.title
                          }
                        </div>
                        <div className="price">
                          <img src='/images/ruppee.png' />
                          {p.price}</div>

                      </div>

                    </div>
                    <span id='author'>{p.category}</span>
                  </div>
                </Wrapper>
              </NavLink>
            )
          })
        }

      </Slider>
    </Carousel>
  )
}

export default SuggestedProducts
const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  height: 330px;
  width: 85%;
  position: relative;
  .image{
    height: 70%;
    padding-top: 10px;
  }
  img{
    height: 80%;
    width: 100%;
    object-fit: contain;
  }
  .miniContainer{
    display: flex;
    margin-top: 1rem;
  }
  .dp{
    flex: 0.2;
    padding-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 25px;
      width: 25px;
    }
  }
  .subContent{
    flex: 1;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .title{
    font-weight: 540;
    font-size: 16px;
  }
  .price{
    width: 30%;
    margin-right: 2px;
    color: green;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price > img{
    padding-right: 5px;
    height: 12px;
    width: 10px;
  }
  .star{
    padding-left: 1.2rem;
  }
  #author{
    font-weight: 500;
    font-size: 13px;
    padding-left: 20%;
  }
  
`
const Carousel = styled.div`
  padding: 1rem 4rem 4rem;
  padding-right: 8rem;
  /* background-color: #fffdfd; */
  color: #fff;

  .wish{
        border: 1px solid black;
        position: absolute;
        right: .2rem;
        top: .2rem;
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
.Flink{
  margin-left: 3rem;
  text-decoration: none;
    color: black;
}
    h2{
        text-align: center;
        margin-bottom: 4rem;
        color: black;
    }

  .box{
    background-Color: #60b060;
    height: 400px;
    border-radius: 10%;
  }
  .box h3{
    text-align: center;
  }
  .slick-slide div{
    /* margin: 0 3rem; */
  }
  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 40px;
    line-height: 1;
    opacity: .75;
    color: #b5ae8c;
  }
  .slick-next{
    right: -20px !important;
  }
  .slick-prev{
    left: 0px !important;
    z-index: 99;
  }
  .slick-dots li.slick-active button:before{
    color: #5dcf5d !important;
  }
  .slick-dots li button:before{
    color: #fff;
    font-size: 1rem;
    top: 2rem;
  }
  
  .image{
    z-index: 555;
    height: 60%;
    width: 100%;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  img{

    height: 90%;
    width: 100%;
    object-fit: contain;
  }
  .feature-link{
    
  }
`