import React from 'react'
import Header from '../common/Header'
import Footer2 from '../common/Footer2'
import styled from 'styled-components'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const OrderDetails = () => {
  return (
    <div>
      <Header />
      <Wrapper>
        <Container>
          <div className="billing-address">ad</div>
          <div className="product-details">
            <div className="product-container">
              <div className="image">
                <img src='/images/scenery4.jpg' alt='title' />
              </div>
              <div className="mini-container">
                <div className="title">
                  <p>Lakmé Sunscreen - SPF 50 .. </p>
                </div>
                <div className="seller">
                  <p>Seller: Author</p>
                </div>
                <div className="price">
                  <CurrencyRupeeIcon />345
                </div>
                <div className="status">
                  <p>Status</p>
                  <span>Your order has been packed</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Wrapper>
      <Footer2 />
    </div>
  )
}

export default OrderDetails
const Wrapper = styled.section`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 1rem 12rem;
`
const Container = styled.section`
  padding: 1rem;
  border: 1px solid black;
  min-height: 50vh;

  .billing-address{
    border: 1px solid black;
    height: 200px;
    width: 50%;
  }
  .product-details{
    margin-top: 2rem;
    border: 1px solid black;
    height: 180px;
  }
  .product-container{
        border: 1px solid black;
        display: flex;
        margin-top: 1.5rem;
        padding: 10px;
       height: 100px;
     }
     .image{
        height: 100px;
        width: 100px;
        flex: .5;
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
     }
     .title{
        flex: .8;
        /* border: 1px solid black; */
        padding-left: 1rem;
     }
     .price{
        flex: .3;
        /* border: 1px solid black; */
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 16px;
     }
     .status{
        flex: .7;
        /* border: 1px solid black; */
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        padding-left: 10px;

        p{
            font-weight: 550;
        }
     }
     .mini-container{
      display: flex;
      flex-direction: column;
     }
`
