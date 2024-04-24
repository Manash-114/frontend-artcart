import React, { useState } from 'react'
import styled from 'styled-components'
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentDetails } from '../../reduxToolkit/features/productList/BillingAddressSlice';
import toast, { Toaster } from 'react-hot-toast';
const PaymentDetails = () => {
    const dispatch = useDispatch();

    const amount = useSelector(state => state.cart.cartTotalAmount)
    console.log(amount)

    const handleCodPayment = () => {
        dispatch(updatePaymentDetails({ amount, mode: 'cod' }))
        toast.success('Payment done Successfully!')
    }
    const handleOnlinePayment = () => {

    }
    return (
        <Wrapper>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h3>Choose Payment Options</h3>
            <Container>
                <Button variant="contained" startIcon={<PaymentsIcon />}
                    onClick={handleCodPayment}
                >
                    Cash On Delivery
                </Button>

                <Button variant="contained" startIcon={<CreditCardIcon />}
                    onClick={handleOnlinePayment}
                >
                    Online
                </Button>
            </Container>
        </Wrapper>
    )
}

export default PaymentDetails
const Wrapper = styled.div`
    border: 1px solid black;
    margin: auto 12rem;
    h3{
        text-align: center;
    }
`
const Container = styled.div`
    padding: 0 10rem;
     border: 1px solid black;
     height: 200px;
     display: flex;
     justify-content: space-around;
     align-items: center;

`
