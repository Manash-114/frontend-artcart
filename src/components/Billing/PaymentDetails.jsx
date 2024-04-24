import React, { useState } from "react";
import styled from "styled-components";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentDetails } from "../../reduxToolkit/features/productList/BillingAddressSlice";
import toast, { Toaster } from "react-hot-toast";
import { createOrder } from "../../apiCalls/users/createOrder";
import { generatePaymentWithRazopay } from "../../apiCalls/users/generatePaymentWithRazopay";
const PaymentDetails = () => {
  const dispatch = useDispatch();

  const amount = useSelector((state) => state.cart.cartTotalAmount);
  console.log(amount);

  const { billingAddress } = useSelector((store) => store);
  const { cartTotalAmount } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.auth);

  const handleCodPayment = () => {
    //preparedata for backend
    const orderReqData = {
      billingAddress: {
        customerName: billingAddress.name,
        phoneNumber: billingAddress.contact,
        alternatePhoneNumber: billingAddress.alternateContact,
        addressId: billingAddress.addressId,
      },
      products: billingAddress.orderProducts,
      paymentReq: {
        id: "0",
        amount: cartTotalAmount,
        mode: "COD",
      },
    };

    createOrder(orderReqData, token, dispatch, "COD");
    // dispatch(updatePaymentDetails({ amount, mode: "cod" }));
    // toast.success("Payment done Successfully!");
    console.log("orderreq data", orderReqData);
  };
  const handleOnlinePayment = () => {
    const paymentReqData = {
      amount: cartTotalAmount,
    };

    const orderReqData = {
      billingAddress: {
        customerName: billingAddress.name,
        phoneNumber: billingAddress.contact,
        alternatePhoneNumber: billingAddress.alternateContact,
        addressId: billingAddress.addressId,
      },
      products: billingAddress.orderProducts,
      paymentReq: {
        id: "0",
        amount: cartTotalAmount,
        mode: "ONLINE",
      },
    };
    generatePaymentWithRazopay(paymentReqData, token, dispatch, orderReqData);
  };
  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <h3>Choose Payment Options</h3>
      <Container>
        <Button
          variant="contained"
          startIcon={<PaymentsIcon />}
          onClick={handleCodPayment}
        >
          Cash On Delivery
        </Button>

        <Button
          variant="contained"
          startIcon={<CreditCardIcon />}
          onClick={handleOnlinePayment}
        >
          Online
        </Button>
      </Container>
    </Wrapper>
  );
};

export default PaymentDetails;
const Wrapper = styled.div`
  border: 1px solid black;
  margin: auto 12rem;
  h3 {
    text-align: center;
  }
`;
const Container = styled.div`
  padding: 0 10rem;
  border: 1px solid black;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
