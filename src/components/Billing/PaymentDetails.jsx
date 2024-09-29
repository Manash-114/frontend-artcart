import React, { useState } from "react";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";
import {
  createOrder,
  onlinePaymentRequest,
} from "../../reduxToolkit/features/customerSlice";
import { resetBillingAddress } from "../../reduxToolkit/features/productList/BillingAddressSlice";

const PaymentDetails = () => {
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const { billingAddress } = useSelector((store) => store);
  const { cartTotalAmount } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { status } = useSelector((store) => store.customer);

  const handleModalClose = () => {
    setOpen(false);
    navigate("/orders");
  };

  const handleOrderConfirmation = (orderData) => {
    setOrderDetails(orderData);
    setOpen(true);
    dispatch(resetBillingAddress());
  };

  const handleCodPayment = async () => {
    const orderReqData = {
      billingAddress: {
        customerName: billingAddress.name,
        phoneNumber: billingAddress.phoneNumber,
        alternatePhoneNumber: billingAddress.alternatePhoneNumber,
        addressId: billingAddress.addressId,
      },
      products: billingAddress.orderProducts,
      paymentReq: {
        id: "0",
        amount: cartTotalAmount,
        mode: "COD",
      },
    };

    try {
      const res = await dispatch(createOrder({ data: orderReqData })).unwrap();
      handleOrderConfirmation(res.data);
    } catch (error) {
      if (error === "Invalid refresh token") dispatch(logOut());
    }
  };

  const handleRazorpayPaymentFailed = () => {
    toast.error("Payment failed. Try another way or try again later.");
  };

  const openRazorpayLayout = (resData, orderReqData) => {
    var options = {
      key: "rzp_test_b7cdwAk8TAVDye",
      amount: resData.amount,
      currency: "INR",
      name: "Artcart",
      image: "https://example.com/your_logo",
      order_id: resData.id,
      handler: async (response) => {
        orderReqData.paymentReq.id = response.razorpay_payment_id;
        try {
          const res = await dispatch(
            createOrder({ data: orderReqData })
          ).unwrap();
          handleOrderConfirmation(res.data);
        } catch (error) {
          if (error === "Invalid refresh token") dispatch(logOut());
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", handleRazorpayPaymentFailed);
    rzp1.open();
  };

  const handleOnlinePayment = async () => {
    const paymentReqData = { amount: cartTotalAmount };
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

    try {
      const res = await dispatch(
        onlinePaymentRequest({ data: paymentReqData })
      ).unwrap();
      if (res.status === "created") {
        openRazorpayLayout(res, orderReqData);
      }
    } catch (error) {
      console.log(error);
      if (error === "Invalid refresh token") dispatch(logOut());
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mx-auto max-w-xl bg-white shadow-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="text-center text-2xl font-semibold mb-6">
        Choose Payment Options
      </h3>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-x-4 sm:space-y-2">
        <Button
          variant="contained"
          startIcon={<PaymentsIcon />}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mb-4 md:mb-0"
          onClick={handleCodPayment}
        >
          Cash On Delivery
        </Button>
        {status === "loading" && <CircularProgress size={20} />}
        <Button
          variant="contained"
          startIcon={<CreditCardIcon />}
          className="bg-green-500  hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          onClick={handleOnlinePayment}
        >
          Online Payment
        </Button>
      </div>

      {/* Modal for Order Confirmation */}
      <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been placed successfully! Here are your order
            details:
          </DialogContentText>
          {orderDetails && (
            <div className="mt-4">
              <p>
                <strong>Customer Name:</strong>{" "}
                {orderDetails.billingAddress?.customerName}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{orderDetails?.payment.amount}
              </p>
              <p>
                <strong>Payment Mode:</strong> {orderDetails?.payment.mode}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Proceed to Orders
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaymentDetails;
