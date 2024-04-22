import React from 'react'
import styled from 'styled-components'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { CurrencyRupee } from '@mui/icons-material';
import { Button } from '@mui/material';

const OrderDetail = () => {
  return (
    <Wrapper>
        <Container>
            <div className="product-detail">
                    <div className="item-image">
                        <img src='/images/scenery1.jpg' alt='title' />
                    </div>
                    <div className="description">
                        <p className='title'>LG FN5U, Noise Isolation, UV Nano, IPX4, </p>
                        <span id='category'>Category:  <span id='catDetail'>Painting</span></span><br />
                        <span id='seller'>Seller:  <span id='sellername'>james Bond</span></span><br />
                        <p className='itemPrice'>
                        <CurrencyRupee
                             style={{
                                height: "1.2rem",
                            }}
                        /><span id="product-price">400</span>
                        </p>
                    </div>
            </div>

            <div className="price-detail">
                    <h2>Order Summary</h2>
                    <div className="mini-container">
                        
                        <div className="desc1">
                            <ShoppingCartCheckoutOutlinedIcon/>
                            <span id='cartid'><span className='count'>( 1 ) </span> items in cart</span>   
                        </div>
                        <div className="item first">
                        <div className="desc order">Order Subtotal</div>
                        <div className="no">
                        <CurrencyRupeeOutlinedIcon
                            style={{
                                height: "1.2rem"
                            }}
                        />200
                        </div>
                        </div>
                        <div className="item">
                        <div className="desc charge">Delivery Charges</div>
                        <div className="no" style={{textDecoration: 'line-through', color: "red"}}>
                        <CurrencyRupee
                             style={{
                                height: "1.2rem",
                                color: "red"
                            }}
                        /><span id="number">10</span>
                        </div>
                        </div>
                        <div className="item">
                        <div className="desc total">Pre-Tax Total</div>
                        <div className="no">
                        <CurrencyRupeeOutlinedIcon
                             style={{
                                height: "1.2rem"
                            }}
                        />200
                        </div>
                        </div>
                       
                    </div>
                </div>
        </Container>
        <Button variant="contained"
            style={{
                width: '14rem',
                height: '2.6rem',
                marginTop: "1rem",
                backgroundColor: 'orange'
            }}
            >Confirm</Button>
    </Wrapper>
  )
}

export default OrderDetail
const Wrapper = styled.div`
    padding: 1rem;
`
const Container = styled.div`
    display: flex;
    gap: 4rem;

    .product-detail{
        border: 1px solid black;
        flex: 1;
        display: flex;
        height: 40%;
        /* justify-content: space-evenly;
        align-items: flex-start; */

        .item-image{
            /* border: 1px solid black; */
            height: 190px;
            width: 190px;
            padding: 10px;

            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        .description{
            /* border: 1px solid black; */
            padding-left: 1rem;
            width: 65%;

            .title{
                font-weight: 550;
                font-size: 1.2rem;
            }
            .itemPrice{
                margin-top: 1rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }

    }

    #number{
        color: red;
        font-size: 1.2rem;
        
    }
    .count{
        font-size: 1.2rem;
        color: green;
        font-weight: 500;
    }

    /* border: 1px solid black; */
    .address{
        flex: 1;
        border: 1px solid black;
    }
    .price-detail{
        flex: .5;
        border: 1px solid black;
        width: 200px;
        height: 350px;
        
        h2{
            text-align: center;
            border-bottom: 1px dotted grey;
        }
    }
    .mini-container{
        padding: 0 2rem;
        align-items: center;
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
    }
    .first{
        margin-top: 1rem;
    }
    .desc1{
        display: flex;
        align-items: center;
    }
    .no{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`