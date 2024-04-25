import React from 'react'
import styled from 'styled-components'

const Services = () => {
  return (
    <Wrapper>
      <Title>Services</Title>
      <Container>
        <div className="delivery-container">
        <div className="image-section delivery" />
           <h1>Free Delivery</h1>
           <p className='shipping'>Free Shipping on Order above 500</p>
        </div>

        <div className="delivery-container">
        <div className="image-section payment" />
           <h1>Safe Payment</h1>
           <p className='secure'>secure payment gateway</p>
        </div>

        <div className="delivery-container">
        <div className="image-section support" />
           <h1>Support</h1>
           <p className='payment2'>24/7 hours support ready</p>
        </div>

        <div className="delivery-container">
        <div className="image-section return" />
           <h1>Return Policy</h1>
           <p className='return2'>30 - days return guarantee </p>
        </div>
        
      </Container>
    </Wrapper>
  )
}

export default Services

const Wrapper = styled.section`
    height: 52vh;
    background-color: inherit;
`
const Container = styled.div`
    margin: auto 8%;
    height: 60%;    
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 35px;
    padding: 10px 120px;

    .shipping{
        margin-top: 1rem;
        font-size: 13px;
        width: 70%;
        font-weight: 550;
    }
    .secure{
        margin-top: 1rem;
        font-size: 15px;
        width: 70%;
        font-weight: 550;
    }
    .payment2{
        margin-top: 1rem;
        font-size: 15px;
        width: 70%;
        font-weight: 550;
    }
    .return2{
        margin-top: 1rem;
        font-size: 15px;
        width: 70%;
        font-weight: 550;
    }
    .delivery-container{
        border-radius: 10px;
        border: .3px solid #efed6c;
        margin-top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-image: linear-gradient(10deg, #fee3f3, #f9edb1);
    }
    .image-section{
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .delivery{
        height: 20%;
        width: 26%;
        background-image: url('./public/images/shipment.png');
    }
    .payment{
        height: 22%;
        width: 20%;
        background-image: url('./public/images/safe.png');
    }
    .support{
        height: 24%;
        width: 18%;
        background-image: url('./public/images/support.png');
    }
    .return{
        height: 24%;
        width: 20%;
        background-image: url('./public/images/return.png');
        }
    p{  
        font-weight: 500;
        text-align: center;
        width: 90%;
        margin: 0 10px;
    }
`
const Title = styled.h1`
    font-size: 2.2rem;
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    font-weight: 600;
    color: #e4fdf3;
    margin-bottom: 1rem;
`