import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, CircularProgress, LinearProgress, Rating } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import BoltIcon from '@mui/icons-material/Bolt';

import ImageProduct from './ImageProduct';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reduxToolkit/features/productList/CartSlice';
import toast, { Toaster } from 'react-hot-toast';


const Product = () => {

  const { id } = useParams();
  const items = useSelector(state => state.product.products.find(product => product.id === parseInt(id)))
  // console.log(items)

  // const {title, rating, brand, description, price,images} = singleproduct;
  const { title } = items || {};

  const [value, setValue] = React.useState(2);

  const selectedProduct = useSelector(state => state.product.products.find(product => product.id === parseInt(id)))
  console.log(selectedProduct)
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    toast.success('successfully added to cart')
    dispatch(addToCart(selectedProduct));
  }


  return (

    <Wrapper>
      <Routing>
        <span id='home'>Home </span> / product / {title}
      </Routing>
      {items ? (

        <Container>
          <div className="product-container">
            {/* image-section */}
            <ImageProduct data={items} />
            {/* content-section */}
            <div className="content-section">
              <div className="content-container">
                <div className="dp-section">
                  <img src='/images/profile.png' alt='profile' />
                </div>
                <div className="info">
                  <h1>{items.title}</h1>
                  <span id='author'>~ {items.brand}</span><br />
                  <div className="date">
                    publish Date
                  </div>
                  <div className="rating">
                    <Rating name="read-only" value={items.rating} readOnly /> ({items.rating})
                  </div>
                  <div className="price">
                    <img src='/images/ruppee.png' alt='price' />{items.price}
                  </div>
                </div>
              </div>
              <div className="action-container">
                <div className="add-to-cart">
                  <Button variant="outlined" color='warning' startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                    <Toaster 
                      position="top-center"
                      reverseOrder={true}
                    />
                  </Button>
                  
                </div>
                <div className="buy">
                  <Button variant="outlined" color='success' startIcon={<BoltIcon />}>
                    Buy Now
                  </Button>
                </div>
              </div>
              <div className="description-container">
                {items.description}
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <LinearProgress />
      )}
    </Wrapper>

  )
}

export default Product

const Wrapper = styled.section`
  height: auto;
`
const Routing = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  padding: 20px 8%;
  background-color: #e0d9d9;
  text-transform: uppercase;
  
  #home{
    color: #042b5e;
    font-weight: 500;
  }
`
const SWrapper = styled.div`
  width: 70%;
  margin: 10px auto;
  padding: 20px 0;

  .card{
    height: 500px;
  }
  .card > img{
    height: 100%;
    width: 98%;
    object-fit: cover;
  }

 
  .slick-slider{
    .slick-arrow{
      z-index: 100;
      height: 9%;
      width: 5%;
      border-radius: 50%;
      background-color: #dfeca1b9;
    }
  }
`
const Container = styled.section`
    padding: 5% 8%;

    .product-container{
      display: flex;
      justify-content: space-between;
      
      gap: 50px;
      height: 650px;
    }
    .image-section{
      flex: 1;
      border: 1px solid black;
    }
    .current-image{
      display: flex;
      justify-content: center;
      img {
        width: 90%;
        object-fit: cover;
      }
      .related-images{
        background-color: aqua;
        height: 200px;
      }
      
    }
    
    
    .content-section{
      flex: 0.6;
      height: 90%;
      border: 1px solid black;
    }
    .content-container{
      
      height: 200px;
      display: flex;
      justify-content: space-between;
      
    }
    .dp-section{
      img{
        height: 25%;
        width: 50%;
      }
      flex: 0.2;
      display: flex;
      justify-content: center;
      padding-top: 30px;
    }
    .info{
      flex: 1;
    }
    .action-container{
     
      height: 10%;
      padding: 8px 80px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    .description-container{
      border-top: 1px solid black;
      border-top-color: #aeb7b7;
      padding: 20px 20px;
      margin: 10px 20px;
    }
    .date{
      padding-top: 10px;
    }
    .rating{
      display: flex;
      align-items: center;
      padding-top: 15px;
    }
    .price{
      padding-top: 10px;
      text-transform: uppercase;
      font-weight: 500;
    }
`
