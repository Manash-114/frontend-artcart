import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CircularProgress, Pagination, Rating } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { FavoriteOutlined } from '@mui/icons-material'
import { addToWishList, clearToastMessage } from '../../reduxToolkit/features/productList/WishListSlice'
import toast, { Toaster } from 'react-hot-toast'


const ProductList = ({ currentProducts }) => {
  const [value, setValue] = useState(2);
  const selectedProducts = useSelector(state => state.product.products);
  const product = useSelector(state => state.product)
  console.log(product)
  const dispatch = useDispatch();

  const toastMessage = useSelector(state => state.wishlist.toastMessage);
  
  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === 'added') {
        toast.success(toastMessage.text);
      } else if (toastMessage.type === 'removed') {
        toast.error(toastMessage.text);
      }
      // Clear toast message after displaying
      dispatch(clearToastMessage());
    }
    // Clear toast message on unmount
   
  }, [dispatch, toastMessage]);

  const handleFavoriteClick = (id,event) => {
    event.preventDefault();
    event.stopPropagation();
    //finding individual item
    const product = selectedProducts.find(product => product.id === parseInt(id))
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

    <Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {product.loading && <div><CircularProgress /></div>}
      {!product.loading && product.products.length ? (

        currentProducts.map((p) => {
          return (
            <NavLink key={p.id} to={`/product/${p.id}`} className="grid-item-link">
              <GridItem className={`grid-items`}>
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
                  <img src={p.images[0]} alt='image'></img>
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
                    />
                    ({p.rating})
                  </div>
                  <div className="miniContainer">
                    <div className="dp">
                      <img src='public/images/profile.png' alt='profile'></img>
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
              </GridItem>
            </NavLink>
          )
        })

      ) : null}

    </Container>


  )
}

export default ProductList


const Container = styled.section`
   
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   height: 100%;
   grid-gap: 20px 10px;

   .grid-item-link{
    text-decoration: none;
    color: black;
   }
  
`
const GridItem = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  height: 330px;
  width: 85%;
  position: relative;

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
    font-size: 12px;
  }
  .price{
    width: 30%;
    margin-right: 2px;
    color: green;
    font-weight: bold;
    font-size: 14px;
  }
  .price > img{
    padding-right: 5px;
    height: 12px;
    width: 10px;
  }
  .star{
    padding-left: 10px;
  }
  #author{
    font-weight: 500;
    font-size: 13px;
    padding-left: 20%;
  }

`

