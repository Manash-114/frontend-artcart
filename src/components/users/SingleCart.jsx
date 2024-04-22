import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import toast, { Toaster } from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../reduxToolkit/features/productList/CartSlice';


const SingleCart = ({ item }) => {
    const [quantity, setQuantity] = useState(item.cartQuantity);

    const dispatch = useDispatch();

    useEffect(() => {
        setQuantity(item.cartQuantity);
    }, [item.cartQuantity]);

    const handleDecrease = () => {
        // console.log("Decrease button clicked for item ID:", item.id);
        dispatch(decreaseQuantity(item.id));
    }
    const handleIncrease = () => {
        // console.log("Increase button clicked for item ID:", item.id);
        if (quantity < item.stock)
            dispatch(increaseQuantity(item.id));
    }
    //Delte cart
    const handleDelete = () => {
        toast.error("Product Removed!")
        dispatch(removeFromCart(item.id));
    }

    return (
        <Wrapper>
            <Container>
                <div className="grid-six">
                    <div className="item image">
                        <img src={item.images[0]} alt={item.name} />
                    </div>
                    <div className="item description">
                        <p className='title'>{item.title}</p>
                        <span id='category'>Category:  <span id='catDetail'>{item.category}</span></span><br />
                        <span id='stock'>In Stock: {item.stock}</span>
                    </div>
                    <div className="item each">
                        <h4>Each</h4>
                        <div className="amount"> <CurrencyRupeeIcon /><span className='price'>{item.price}</span></div>

                    </div>
                    <div className="item quantity">
                        <h4>Quantity</h4>
                        <div className="quantity-holder">

                            <RemoveIcon className='btn decrease'
                                onClick={handleDecrease}
                            />
                            <input className='quantity' type='text' value={quantity} readOnly />
                            <AddIcon className={`btn increase ${quantity === item.stock ? 'disabled' : ''}`}
                                onClick={handleIncrease}
                            />

                        </div>
                    </div>
                    <div className="item total">
                        <h4>Total</h4>
                        <div className="currency">
                            <CurrencyRupeeIcon /><p className="price">{item.price * item.cartQuantity}</p>
                        </div>
                    </div>
                    <div className="item del">
                        <Toaster
                            position="top-center"
                            reverseOrder={true}
                        />
                        <DeleteForeverIcon
                            style={{
                                width: '3rem',
                                height: '4rem',
                                color: 'red',
                                cursor: 'pointer'
                            }}
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </Container>
        </Wrapper>
    )
}

export default SingleCart

const Wrapper = styled.section`
    margin-top: 1.2rem;
    /* background-color: aqua; */
    /* border: 1px solid black; */
   
`
const Container = styled.div`
    height: 10rem;
    position: relative;
    padding: 15px 0;

    .grid-six{
        display: grid;
        grid-template-columns: 1.5fr 1.5fr repeat(3, 1fr) 0.5fr;
        height: 100%;
        border: 1px solid black;
    }
    .item{
        overflow: hidden;
        height: 90%;
        padding: 10px;
    }
    .image{

    }
    .image > img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .description{
        padding-left: 5px;
        #category{
            font-size: .9rem;
        }
        #catDetail{
            font-size: .9rem;
            font-weight: 500;
        }
        #stock{
            color: #028c02
        }
    }
    .title{
        font-weight: 550;
    }
    .del{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 20px;
    }
   h4{
    text-align: center;
   }
   .amount{
    display: flex;
    justify-content: center;
    align-items: center;
   }
   .price{
    font-weight: 450;
   }
   .quantity-holder{
    display: flex;
    justify-content: center;
    border: 1px solid #796f6f;
    margin: 0 10px;
   }
   .quantity{
    text-align: center;
    font-weight: 550;
    
    input{
        width: 30%;
        border: none;
    }
}
   .btn{
    cursor: pointer;
   }
   .currency{
    height: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
   }
`
